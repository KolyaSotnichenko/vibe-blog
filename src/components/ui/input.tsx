import * as React from "react";
import { cn } from "@/src/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-orange-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
