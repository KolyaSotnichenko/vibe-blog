import * as React from "react";
import { cn } from "@/src/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
