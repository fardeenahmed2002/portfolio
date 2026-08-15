import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
export { Textarea };
