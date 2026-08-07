"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import type { NavLinkChild } from "@/types";
import { cn } from "@/lib/utils";

type NavDropdownProps = {
  label: string;
  items: NavLinkChild[];
  darkTheme?: boolean;
};

export function NavDropdown({ label, items, darkTheme = false }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const triggerClassName = cn(
    "inline-flex items-center gap-1 transition-colors duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    darkTheme
      ? "text-white/85 hover:text-white focus-visible:outline-white"
      : "text-brand-ink/75 hover:text-brand-blue focus-visible:outline-brand-blue",
  );

  const itemClassName = cn(
    "block whitespace-nowrap rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    darkTheme
      ? "text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-white"
      : "text-brand-ink/80 hover:bg-brand-blue-mist/80 hover:text-brand-blue focus-visible:outline-brand-blue",
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        {label}
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <ul
        id={menuId}
        role="menu"
        aria-label={label}
        className={cn(
          "absolute top-[calc(100%+0.5rem)] left-1/2 z-[120] min-w-[13.5rem] -translate-x-1/2 rounded-lg border p-1.5 shadow-lg transition-all duration-200",
          darkTheme
            ? "border-white/10 bg-[#0A1B33]/98 backdrop-blur-md"
            : "border-brand-line/80 bg-white/98 backdrop-blur-[14px]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        {items.map((item) => (
          <li key={item.label} role="none">
            <a
              href={item.href}
              role="menuitem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} (abre em nova aba)`}
              className={itemClassName}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
