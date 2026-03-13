import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg border bg-card p-6", className)} {...props} />
);
