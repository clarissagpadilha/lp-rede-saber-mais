import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.09em]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
