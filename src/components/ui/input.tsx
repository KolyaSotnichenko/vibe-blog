import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-9 w-full border border-rule bg-paper px-3 py-1 text-sm font-serif text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rule",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
