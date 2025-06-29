import React from 'react';
import { cn } from './utils';

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

export { Input };
