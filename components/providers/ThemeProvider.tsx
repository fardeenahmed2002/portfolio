'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = string;
type ThemeProviderProps = {
  children: ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  themes?: string[];
};

type ThemeContextValue = {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  resolvedTheme?: Theme;
  themes?: string[];
  systemTheme?: Theme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme'; // also used as the cookie name (persisted server-side)
const DEFAULT_THEME = 'dark';
const DARK_CLASS = 'dark';

/**
 * Persist the theme. We use a cookie (not localStorage) so the server can read
 * the choice and stamp the `dark` class on <html> during SSR, eliminating the
 * flash-of-wrong-theme without any executable inline <script> (which React 19.2
 * forbids rendering). We still migrate any value left over in localStorage from
 * the previous next-themes setup.
 */
function persistTheme(theme: Theme) {
  try {
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
      theme,
    )};path=/;max-age=31536000;samesite=lax`;
  } catch {
    // ignore cookie write errors (e.g. during SSR — though this only runs client-side)
  }
}

function readPersistedTheme(storageKey: string): Theme | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    // Cookie is the source of truth (so SSR and client match). If absent,
    // migrate a legacy localStorage value into the cookie.
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${storageKey}=([^;]+)`),
    );
    if (match) return decodeURIComponent(match[1]);

    const legacy = window.localStorage.getItem(storageKey);
    if (legacy) {
      persistTheme(legacy);
      return legacy;
    }
  } catch {
    // ignore storage/cookie access errors
  }
  return undefined;
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme, attribute: 'class' | 'data-theme', enableSystem: boolean): Theme {
  if (typeof document === 'undefined') return theme;
  const resolved = theme === 'system' && enableSystem ? getSystemTheme() : theme;
  const root = document.documentElement;
  if (attribute === 'class') {
    root.classList.toggle(DARK_CLASS, resolved === 'dark');
  } else {
    root.setAttribute('data-theme', resolved);
  }
  root.style.colorScheme = resolved;
  return resolved;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = DEFAULT_THEME,
  enableSystem = false,
  storageKey = STORAGE_KEY,
  themes,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);
  const [resolvedTheme, setResolvedTheme] = useState<Theme | undefined>(undefined);

  // Hydrate theme from the persisted cookie (or system) after mount, then apply it.
  useEffect(() => {
    let initial = defaultTheme;
    const stored = readPersistedTheme(storageKey);
    if (stored) initial = stored;
    else if (enableSystem) initial = 'system';
    setThemeState(initial);
    const resolved = applyTheme(initial, attribute, enableSystem);
    setResolvedTheme(resolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to OS theme changes when in system mode.
  useEffect(() => {
    if (!enableSystem) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (theme === 'system') {
        const resolved = applyTheme('system', attribute, enableSystem);
        setResolvedTheme(resolved);
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme, attribute, enableSystem]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      const resolved = applyTheme(next, attribute, enableSystem);
      setResolvedTheme(resolved);
      persistTheme(next);
    },
    [attribute, enableSystem, storageKey],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        themes,
        systemTheme: enableSystem ? getSystemTheme() : undefined,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Re-export a next-themes-compatible hook name so existing imports keep working.
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  return (
    ctx ?? {
      theme: undefined,
      setTheme: () => {},
      resolvedTheme: undefined,
      themes: undefined,
      systemTheme: undefined,
    }
  );
}

