import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Alert = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role="alert"
    className={cn(
      "relative w-full border border-rule bg-paper px-4 py-3 text-sm text-ink",
      className,
    )}
    {...props}
  />
);
