"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { NavLinkChild } from "@/types";
import { cn } from "@/lib/utils";

type NavDropdownProps = {
  label: string;
  items: NavLinkChild[];
  darkTheme?: boolean;
  align?: "center" | "end";
};

export function NavDropdown({
  label,
  items,
  darkTheme = false,
  align = "center",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const triggerClassName = cn(
    "inline-flex items-center gap-1 transition-colors duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    darkTheme
      ? "text-white/95 hover:text-white focus-visible:outline-white"
      : "text-brand-navy/90 hover:text-brand-blue focus-visible:outline-brand-blue",
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
      ref={containerRef}
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

      <div
        className={cn(
          "absolute top-full z-[120] min-w-[13.5rem] pt-2",
          align === "end" ? "right-0" : "left-1/2 -translate-x-1/2",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <ul
          id={menuId}
          role="menu"
          aria-label={label}
          aria-hidden={!open}
          className={cn(
            "max-h-[min(24rem,calc(100dvh-var(--header-height)-1rem))] overflow-y-auto overscroll-contain rounded-lg border p-1.5 shadow-lg transition-all duration-200",
            darkTheme
              ? "border-white/10 bg-[#0A1B33]/98 backdrop-blur-md"
              : "border-brand-line/80 bg-white/98 backdrop-blur-[14px]",
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
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
                tabIndex={open ? 0 : -1}
                className={itemClassName}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
