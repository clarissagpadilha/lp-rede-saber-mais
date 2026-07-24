"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 12;

export function useHeaderScroll(threshold = SCROLL_THRESHOLD): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setIsScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}
