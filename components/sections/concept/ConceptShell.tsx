"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

type ConceptShellProps = {
  children: ReactNode;
  className?: string;
};

export function ConceptShell({ children, className }: ConceptShellProps) {
  return (
    <section
      id="conceito"
      className={cn(
        "relative scroll-mt-[var(--header-height)] overflow-hidden bg-brand-navy py-16 text-white sm:py-20 lg:py-24",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[520px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px]"
      />
      <div className="relative z-[1]">{children}</div>
    </section>
  );
};

type ConceptHeaderProps = {
  eyebrow: string;
  headline: string;
  highlight: string;
  subline?: string;
};

export function ConceptHeader({ eyebrow, headline, highlight, subline }: ConceptHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      {...(reduceMotion ? {} : fadeUp)}
      className="mx-auto flex max-w-2xl flex-col gap-4 text-center sm:gap-5"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#FFD9BB]">{eyebrow}</p>
      <h2 className="flex flex-col gap-2 font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-white sm:gap-2.5">
        <span>{headline}</span>
        <span className="text-brand-orange">{highlight}</span>
      </h2>
      {subline ? (
        <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">{subline}</p>
      ) : null}
    </motion.header>
  );
}

export { fadeUp };
