import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionLabelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn("mx-auto mb-14 max-w-[680px] text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
