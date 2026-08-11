"use client";

import { useCallback, useId, useRef, useState } from "react";

import { ButtonLink, Container } from "@/components/ui";
import { ctaLink, navigationLinks, navigationSectionIds } from "@/content/navigation";
import { useHeaderScroll, useScrollSpy } from "@/hooks";
import { getSectionIdFromHref } from "@/lib/scroll";
import { cn } from "@/lib/utils";

import { Logo } from "./Logo";
import { MobileNav, MobileNavToggle } from "./MobileNav";
import { NavDropdown } from "./NavDropdown";
import { SiteNavLink } from "./SiteNavLink";
import { SocialNavIcons } from "./SocialNavIcons";

type HeaderProps = {
  variant?: "default" | "hero";
};

const navItemClassName =
  "rounded-md px-2.5 py-1.5 transition-colors hover:bg-brand-blue-mist/70 xl:px-3";

export function Header({ variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isScrolled = useHeaderScroll();
  const activeSectionId = useScrollSpy(navigationSectionIds);

  const isHeroVariant = variant === "hero";
  const isSolid = !isHeroVariant || isScrolled;

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <header
      data-variant={variant}
      data-scrolled={isSolid ? "true" : "false"}
      className={cn(
        "sticky top-0 z-[100] min-h-[var(--header-height)] overflow-visible transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        isSolid
          ? "border-b border-brand-line/70 bg-white/95 shadow-[0_1px_2px_rgba(15,42,74,0.06),0_8px_24px_rgba(15,42,74,0.08)] backdrop-blur-[14px] supports-[backdrop-filter]:bg-white/95"
          : "border-b border-brand-line/40 bg-white/85 shadow-[0_1px_2px_rgba(15,42,74,0.05)] backdrop-blur-[12px] supports-[backdrop-filter]:bg-white/85",
      )}
    >
      <Container className="flex min-h-[var(--header-height)] items-center gap-2.5 py-3 lg:gap-3 xl:gap-3.5">
        <Logo className="shrink-0 [&_img]:h-9 [&_img]:w-auto [&_img]:sm:h-10" />

        <nav
          aria-label="Menu principal"
          className="hidden min-w-0 flex-nowrap items-center gap-0.5 whitespace-nowrap text-[13px] font-medium tracking-[0.01em] lg:flex xl:gap-1 xl:text-[13.5px] 2xl:text-[14px]"
        >
          {navigationLinks.map((link, index) => {
            if (link.children?.length) {
              const alignMenuToEnd = index >= navigationLinks.length - 2;

              return (
                <NavDropdown
                  key={link.label}
                  label={link.menuLabel ?? link.label}
                  items={link.children}
                  align={alignMenuToEnd ? "end" : "center"}
                  triggerClassName={navItemClassName}
                />
              );
            }

            const sectionId = getSectionIdFromHref(link.href ?? "");
            return (
              <SiteNavLink
                key={link.label}
                href={link.href ?? "#"}
                label={link.menuLabel ?? link.label}
                active={sectionId !== null && sectionId === activeSectionId}
                className={navItemClassName}
              />
            );
          })}
        </nav>

        <ButtonLink
          href={ctaLink.href}
          className="hidden min-h-10 shrink-0 whitespace-nowrap rounded-lg px-4 py-2.5 text-[13px] md:inline-flex xl:px-5 xl:text-sm"
        >
          {ctaLink.label}
        </ButtonLink>

        <SocialNavIcons className="hidden shrink-0 lg:flex" />

        <div className="ml-auto shrink-0 lg:hidden">
          <MobileNavToggle
            ref={toggleRef}
            open={menuOpen}
            onToggle={() => setMenuOpen((current) => !current)}
            controlsId={menuId}
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
