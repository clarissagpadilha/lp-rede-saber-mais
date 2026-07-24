"use client";

import { forwardRef, memo, useEffect, useRef } from "react";

import { ButtonLink } from "@/components/ui";
import { ctaLink, navigationLinks } from "@/content/navigation";
import { getSectionIdFromHref } from "@/lib/scroll";
import { cn } from "@/lib/utils";

import { CloseIcon } from "../ui/SectionIcons";
import { SiteNavLink } from "./SiteNavLink";

type MobileNavProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  activeSectionId: string | null;
  solid: boolean;
};

export const MobileNav = memo(function MobileNav({
  id,
  open,
  onClose,
  activeSectionId,
  solid,
}: MobileNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !navRef.current) return;

      const focusable = navRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const firstLink = navRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[110] lg:hidden",
        "transition-opacity duration-300 ease-out",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="presentation"
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Fechar menu"
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-brand-navy/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <nav
        ref={navRef}
        id={id}
        aria-label="Menu principal mobile"
        aria-hidden={!open}
        className={cn(
          "absolute inset-x-0 top-[var(--header-height)] max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b px-5 py-5 shadow-lg transition-all duration-300 ease-out sm:px-7",
          solid ? "border-brand-line bg-white/98 backdrop-blur-[14px]" : "border-white/10 bg-[#0A1B33]/95 backdrop-blur-md",
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1">
          {navigationLinks.map((link) => {
            const sectionId = getSectionIdFromHref(link.href);
            return (
              <li key={link.href}>
                <SiteNavLink
                  href={link.href}
                  label={link.label}
                  active={sectionId !== null && sectionId === activeSectionId}
                  darkTheme={!solid}
                  onNavigate={onClose}
                  className={cn(
                    "block min-h-11 rounded-lg px-3 py-3 text-[15px]",
                    solid ? "hover:bg-brand-blue-mist/80" : "hover:bg-white/10",
                  )}
                />
              </li>
            );
          })}
        </ul>
        <div className={cn("mt-4 border-t pt-4", solid ? "border-brand-line" : "border-white/10")}>
          <ButtonLink href={ctaLink.href} className="w-full rounded-lg" onClick={onClose}>
            {ctaLink.label}
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
});

export const MobileNavToggle = forwardRef<
  HTMLButtonElement,
  {
    open: boolean;
    onToggle: () => void;
    controlsId: string;
    theme?: "light" | "dark";
  }
>(function MobileNavToggle({ open, onToggle, controlsId, theme = "light" }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 lg:hidden",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        theme === "dark"
          ? "text-white focus-visible:outline-white"
          : "text-brand-navy focus-visible:outline-brand-blue",
      )}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      onClick={onToggle}
    >
      {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
    </button>
  );
});

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
      className={className}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
