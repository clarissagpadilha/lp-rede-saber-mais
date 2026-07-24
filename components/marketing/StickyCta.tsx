"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui";
import { ctaLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 480;

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-line bg-white/95 p-3 backdrop-blur-md sm:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
      )}
    >
      <ButtonLink href={ctaLink.href} className="w-full">
        {ctaLink.label}
      </ButtonLink>
    </div>
  );
}
