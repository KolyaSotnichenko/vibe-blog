import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn("text-xs font-medium tracking-wide uppercase text-ink-muted", className)}
    {...props}
  />
);
