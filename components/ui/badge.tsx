import * as React from 'react';
import { cn } from '@/lib/utils';

function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'outline' | 'destructive' }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variant === 'default' && 'bg-primary/20 text-primary border border-primary/30',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        variant === 'outline' && 'border border-border text-foreground',
        variant === 'destructive' && 'bg-destructive/20 text-destructive border border-destructive/30',
        className
      )}
      {...props}
    />
  );
}
export { Badge };
