import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type NavSubmenuLabelProps = {
  label: string;
  darkTheme?: boolean;
  className?: string;
};

export function NavSubmenuLabel({ label, darkTheme = false, className }: NavSubmenuLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        darkTheme ? "text-white/85" : "text-brand-ink/75",
        className,
      )}
    >
      {label}
      <ChevronDown className="size-3.5 shrink-0 opacity-80" aria-hidden />
    </span>
  );
}
