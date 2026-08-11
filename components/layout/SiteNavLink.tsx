"use client";

import Link from "next/link";

import { getSectionIdFromHref, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type SiteNavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
  darkTheme?: boolean;
  className?: string;
  onNavigate?: () => void;
  tabIndex?: number;
};

export function SiteNavLink({
  href,
  label,
  active = false,
  darkTheme = false,
  className,
  onNavigate,
  tabIndex,
}: SiteNavLinkProps) {
  const sectionId = getSectionIdFromHref(href);
  const isHashLink = sectionId !== null;
  const isExternal = href.startsWith("http");

  const linkClassName = cn(
    "relative transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    darkTheme
      ? "focus-visible:outline-white"
      : "focus-visible:outline-brand-blue",
    active
      ? darkTheme
        ? "font-semibold text-white"
        : "font-semibold text-brand-blue"
      : darkTheme
        ? "text-white/95 hover:text-white"
        : "text-brand-navy/90 hover:text-brand-blue",
    className,
  );

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      event.preventDefault();
      scrollToSection(href);
    }
    onNavigate?.();
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={`${label} (abre em nova aba)`}
        tabIndex={tabIndex}
        className={linkClassName}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      tabIndex={tabIndex}
      className={linkClassName}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300",
          active ? "w-full opacity-100" : "w-0 opacity-0",
          darkTheme ? "bg-white" : "bg-brand-blue",
        )}
      />
    </Link>
  );
}
