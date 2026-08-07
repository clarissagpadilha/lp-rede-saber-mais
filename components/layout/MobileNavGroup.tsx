"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import type { NavLinkChild } from "@/types";
import { cn } from "@/lib/utils";

import { SiteNavLink } from "./SiteNavLink";

type MobileNavGroupProps = {
  label: string;
  items: NavLinkChild[];
  darkTheme?: boolean;
  solid?: boolean;
  onNavigate?: () => void;
};

export function MobileNavGroup({
  label,
  items,
  darkTheme = false,
  solid = true,
  onNavigate,
}: MobileNavGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <li>
      <button
        type="button"
        className={cn(
          "flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          darkTheme
            ? "text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-white"
            : "text-brand-ink/75 hover:bg-brand-blue-mist/80 hover:text-brand-blue focus-visible:outline-brand-blue",
        )}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((current) => !current)}
      >
        {label}
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")}
          aria-hidden
        />
      </button>

      <ul
        id={panelId}
        className={cn(
          "overflow-hidden transition-all duration-200",
          expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {items.map((item) => (
          <li key={item.href}>
            <SiteNavLink
              href={item.href}
              label={item.label}
              darkTheme={darkTheme}
              onNavigate={onNavigate}
              className={cn(
                "block min-h-10 rounded-lg py-2.5 pr-3 pl-7 text-[14px]",
                solid ? "hover:bg-brand-blue-mist/80" : "hover:bg-white/10",
              )}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}
