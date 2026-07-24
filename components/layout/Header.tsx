"use client";

import { memo, useCallback, useId, useRef, useState } from "react";

import { ButtonLink, Container } from "@/components/ui";
import { ctaLink, navigationLinks, navigationSectionIds } from "@/content/navigation";
import { useHeaderScroll, useScrollSpy } from "@/hooks";
import { getSectionIdFromHref } from "@/lib/scroll";
import { cn } from "@/lib/utils";

import { Logo } from "./Logo";
import { MobileNav, MobileNavToggle } from "./MobileNav";
import { SiteNavLink } from "./SiteNavLink";

type HeaderProps = {
  variant?: "default" | "hero";
};

export function Header({ variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isScrolled = useHeaderScroll();
  const activeSectionId = useScrollSpy(navigationSectionIds);

  const isHeroVariant = variant === "hero";
  const isSolid = !isHeroVariant || isScrolled;
  const useDarkNav = isHeroVariant && !isSolid;

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <header
      data-variant={variant}
      data-scrolled={isSolid ? "true" : "false"}
      className={cn(
        "sticky top-0 z-[100] min-h-[var(--header-height)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        isSolid
          ? "border-b border-brand-line/70 bg-white/95 shadow-[0_1px_2px_rgba(15,42,74,0.06),0_8px_24px_rgba(15,42,74,0.08)] backdrop-blur-[14px] supports-[backdrop-filter]:bg-white/95"
          : "border-b border-white/10 bg-[#0A1B33]/10 backdrop-blur-[6px]",
      )}
    >
      <Container className="flex min-h-[var(--header-height)] items-center justify-between gap-3 py-3 sm:gap-4 sm:py-3.5">
        <Logo theme={useDarkNav ? "dark" : "light"} />

        <nav
          aria-label="Menu principal"
          className="hidden items-center gap-5 text-[13.5px] font-medium lg:flex xl:gap-8 xl:text-[14px]"
        >
          {navigationLinks.map((link) => {
            const sectionId = getSectionIdFromHref(link.href);
            return (
              <SiteNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={sectionId !== null && sectionId === activeSectionId}
                darkTheme={useDarkNav}
              />
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ButtonLink
            href={ctaLink.href}
            className="hidden rounded-lg px-4 py-2.5 text-[13px] md:inline-flex lg:px-5 lg:text-sm"
          >
            {ctaLink.label}
          </ButtonLink>
          <MobileNavToggle
            ref={toggleRef}
            open={menuOpen}
            onToggle={() => setMenuOpen((current) => !current)}
            controlsId={menuId}
            theme={useDarkNav ? "dark" : "light"}
          />
        </div>
      </Container>

      <MobileNav
        id={menuId}
        open={menuOpen}
        onClose={closeMenu}
        activeSectionId={activeSectionId}
        solid={isSolid}
      />
    </header>
  );
}
