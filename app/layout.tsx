import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Fardeen Ahmed — Frontend Developer', template: '%s | Fardeen Ahmed' },
  description:
    'Frontend Developer specializing in React, Next.js, Tailwind CSS and interactive UI.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  authors: [{ name: 'Fardeen Ahmed' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Fardeen Ahmed Portfolio',
  },
  robots: { index: true, follow: true },
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

// Structured data for SEO (Person + WebSite schema).
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fardeen Ahmed',
  jobTitle: 'Frontend Developer',
  url: baseUrl,
  sameAs: [
    'https://github.com/fardeen',
    'https://linkedin.com/in/fardeen',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'Tailwind CSS',
    'AI Automation',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fardeen Ahmed — Frontend Developer',
  url: baseUrl,
  author: { '@type': 'Person', name: 'Fardeen Ahmed' },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolve the initial theme on the server (from the persisted cookie) and
  // stamp it onto <html> during SSR. This avoids a flash of the wrong theme
  // WITHOUT any executable <script> tag — the previous approach (a theme
  // bootstrap <script> in <head>) triggered React 19.2's
  // "Encountered a script tag while rendering React component" warning.
  // Visitors without the cookie fall back to the default (dark) theme.
  let initialTheme = 'dark';
  try {
    const store = await cookies();
    const stored = store.get('theme')?.value;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      initialTheme = stored;
    }
  } catch {
    // cookies() may throw in unsupported environments; fall back to default.
  }
  const prefersDark =
    initialTheme === 'system'
      ? true // assume dark for SSR; provider reconciles on mount
      : initialTheme === 'dark';
  const htmlClassName = prefersDark ? 'dark' : '';

  return (
    <html lang="en" className={htmlClassName} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={baseUrl} />
        {/* Inert structured-data scripts only. These are data, not executable
            code, so React 19.2 does not warn on them. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`} cz-shortcut-listen="true"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

