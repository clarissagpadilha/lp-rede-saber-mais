import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1180px]",
        "pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))]",
        "sm:px-7",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
