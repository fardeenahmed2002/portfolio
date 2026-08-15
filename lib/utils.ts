import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function formatDateRange(
  start: Date | string,
  end?: Date | string,
  current?: boolean
): string {
  const s = formatDate(start);
  if (current) return `${s} – Present`;
  if (!end) return s;
  return `${s} – ${formatDate(end)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
