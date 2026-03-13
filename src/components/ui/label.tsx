import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-sm font-medium", className)} {...props} />
);
