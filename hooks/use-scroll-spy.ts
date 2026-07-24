"use client";

import { useEffect, useState } from "react";

import { getHeaderHeight } from "@/lib/scroll";

export function useScrollSpy(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const elements = idsKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size === 0) return;

        let nextActive: string | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        visible.forEach((entry, id) => {
          const distance = Math.abs(entry.boundingClientRect.top - getHeaderHeight());
          if (distance < closestDistance) {
            closestDistance = distance;
            nextActive = id;
          }
        });

        if (nextActive) {
          setActiveId(nextActive);
        }
      },
      {
        rootMargin: `-${getHeaderHeight()}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
