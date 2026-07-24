"use client";

import { motion, useReducedMotion } from "framer-motion";

import { conceptContent, conceptPillars } from "@/content/concept";

import { fadeUp } from "./ConceptShell";

const NODE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;
const RADIUS = 138;

function nodePosition(angleDeg: number, cx = 200, cy = 200) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + RADIUS * Math.cos(rad - Math.PI / 2),
    y: cy + RADIUS * Math.sin(rad - Math.PI / 2),
  };
}

type NucleusVisualProps = {
  contrast: string;
  nucleusLabel: string;
};

export function NucleusVisual({ contrast, nucleusLabel }: NucleusVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-2 pt-2 sm:px-4 sm:pt-4">
      <motion.p
        {...(reduceMotion ? {} : { ...fadeUp, transition: { ...fadeUp.transition, delay: 0.15 } })}
        className="absolute left-0 top-6 hidden font-serif text-2xl text-white/20 lg:block xl:text-3xl"
      >
        {contrast}
      </motion.p>

      <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)]">
        <svg viewBox="0 0 400 400" className="size-full" aria-hidden>
          <defs>
            <radialGradient id="concept-nucleus-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8722C" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#1D4E89" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0F2A4A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="120" fill="url(#concept-nucleus-glow)" />
          {conceptPillars.map((pillar, index) => {
            const { x, y } = nodePosition(NODE_ANGLES[index] ?? 0);
            return (
              <line
                key={pillar.id}
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            );
          })}
        </svg>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 flex size-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-orange/40 bg-brand-navy/80 shadow-[0_0_48px_rgba(232,114,44,0.25)] backdrop-blur-sm"
        >
          <p className="max-w-[7rem] text-center font-serif text-[clamp(0.85rem,2.5vw,1rem)] leading-tight text-white">
            {nucleusLabel}
          </p>
        </motion.div>

        {conceptPillars.map((pillar, index) => {
          const angle = NODE_ANGLES[index] ?? 0;
          const left = 50 + (RADIUS / 200) * 50 * Math.cos((angle * Math.PI) / 180 - Math.PI / 2);
          const top = 50 + (RADIUS / 200) * 50 * Math.sin((angle * Math.PI) / 180 - Math.PI / 2);

          return (
            <motion.div
              key={pillar.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className="block whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-white/85 backdrop-blur-sm sm:px-3 sm:text-[10px]">
                {pillar.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        {...(reduceMotion ? {} : { ...fadeUp, transition: { ...fadeUp.transition, delay: 0.2 } })}
        className="mt-6 text-center font-serif text-xl text-white/25 lg:hidden"
      >
        {contrast}
      </motion.p>
    </div>
  );
}
