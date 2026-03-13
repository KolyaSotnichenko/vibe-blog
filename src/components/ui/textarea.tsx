import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full border border-rule bg-paper px-3 py-2 text-sm font-serif text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rule",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
