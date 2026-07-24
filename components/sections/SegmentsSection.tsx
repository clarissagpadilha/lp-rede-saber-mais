"use client";

import { useState } from "react";

import { Container, SectionHeader } from "@/components/ui";
import { segments, segmentsContent } from "@/content/segments";
import { cn } from "@/lib/utils";

export function SegmentsSection() {
  const { eyebrow, title } = segmentsContent;
  const [activeId, setActiveId] = useState(segments[0]?.id ?? "");
  const activeSegment = segments.find((segment) => segment.id === activeId) ?? segments[0];

  return (
    <section id="organizacoes" className="bg-brand-offwhite section-spacing">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div
          role="tablist"
          aria-label="Tipos de organização"
          aria-orientation="horizontal"
          className="mb-9 flex flex-wrap justify-center gap-2 sm:gap-2.5"
        >
          {segments.map((segment) => {
            const selected = segment.id === activeId;

            return (
              <button
                key={segment.id}
                type="button"
                role="tab"
                id={`tab-${segment.id}`}
                aria-selected={selected}
                aria-controls={`panel-${segment.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(segment.id)}
                onKeyDown={(event) => {
                  const currentIndex = segments.findIndex((item) => item.id === activeId);
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    setActiveId(segments[(currentIndex + 1) % segments.length].id);
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    setActiveId(segments[(currentIndex - 1 + segments.length) % segments.length].id);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    setActiveId(segments[0].id);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    setActiveId(segments[segments.length - 1].id);
                  }
                }}
                className={cn(
                  "min-h-11 rounded-full border px-3.5 py-2.5 text-[12.5px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:px-[18px] sm:text-[13.5px]",
                  selected
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-line bg-white text-brand-gray hover:border-brand-blue hover:text-brand-blue",
                )}
              >
                {segment.label}
              </button>
            );
          })}
        </div>

        {activeSegment ? (
          <div
            role="tabpanel"
            id={`panel-${activeSegment.id}`}
            aria-labelledby={`tab-${activeSegment.id}`}
            className="mx-auto max-w-[720px] rounded-brand border border-brand-line bg-white p-8 text-center sm:p-10"
          >
            <h3 className="mb-3 font-serif text-[21px] text-brand-navy">{activeSegment.title}</h3>
            <p className="text-base text-brand-gray">{activeSegment.description}</p>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
