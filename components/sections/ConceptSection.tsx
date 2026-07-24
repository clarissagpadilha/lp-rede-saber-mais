"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

import { Container } from "@/components/ui";
import { conceptContent } from "@/content/concept";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { ConceptHeader, ConceptShell, fadeUp } from "./concept/ConceptShell";
import { NucleusVisual } from "./concept/NucleusVisual";

export function ConceptSection() {
  const reduceMotion = useReducedMotion();
  const { contrast, cta, eyebrow, headline, highlight, nucleusLabel, subline } = conceptContent;

  const ctaHref = useMemo(() => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
    if (!number) return cta.fallbackHref;
    return buildWhatsAppUrl(number, cta.whatsappMessage) ?? cta.fallbackHref;
  }, [cta.fallbackHref, cta.whatsappMessage]);

  return (
    <ConceptShell>
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
          <ConceptHeader eyebrow={eyebrow} headline={headline} highlight={highlight} subline={subline} />
          <NucleusVisual contrast={contrast} nucleusLabel={nucleusLabel} />

          <motion.div
            {...(reduceMotion ? {} : { ...fadeUp, transition: { ...fadeUp.transition, delay: 0.35 } })}
            className="flex justify-center"
          >
            <a
              href={ctaHref}
              target={ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-orange/45 bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              {cta.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>
      </Container>
    </ConceptShell>
  );
}
