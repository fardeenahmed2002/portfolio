import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';
export { Input };
