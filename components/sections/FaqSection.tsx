"use client";

import { useId, useState } from "react";

import { Container, SectionHeader } from "@/components/ui";
import { faqContent, faqItems } from "@/content/faq";
import { cn } from "@/lib/utils";

import { PlusIcon } from "../ui/SectionIcons";

export function FaqSection() {
  const { eyebrow, title } = faqContent;
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const baseId = useId();

  return (
    <section id="faq" className="section-spacing">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="mx-auto max-w-[760px]">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const buttonId = `${baseId}-button-${item.id}`;
            const panelId = `${baseId}-panel-${item.id}`;

            return (
              <article key={item.id} className="border-b border-brand-line">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left font-serif text-[17px] font-medium text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    <span>{item.question}</span>
                    <PlusIcon
                      className={cn(
                        "size-[18px] shrink-0 text-brand-orange transition-transform",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p className="max-w-[680px] pb-5 text-[15px] leading-relaxed text-brand-gray">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
