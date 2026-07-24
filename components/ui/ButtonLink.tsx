"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { getSectionIdFromHref, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary";

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children?: ReactNode;
  href: string;
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "border-transparent bg-brand-orange text-white hover:bg-brand-orange-dark focus-visible:outline-brand-orange",
  secondary:
    "border-brand-line bg-transparent text-brand-navy hover:border-brand-blue hover:text-brand-blue focus-visible:outline-brand-blue",
};

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
  onClick,
  ...props
}: ButtonLinkProps) {
  const isHashLink = getSectionIdFromHref(href) !== null;

  return (
    <Link
      href={href}
      onClick={(event) => {
        if (isHashLink) {
          event.preventDefault();
          scrollToSection(href);
        }
        onClick?.(event);
      }}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
