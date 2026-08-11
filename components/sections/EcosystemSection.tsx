import { Container, SectionHeader, SectionIcon } from "@/components/ui";
import { ecosystemContent, pillars } from "@/content/pillars";
import type { PillarItem } from "@/types";

function PillarCard({ pillar }: { pillar: PillarItem }) {
  return (
    <article className="relative z-[1] rounded-brand border border-brand-line bg-white p-5 text-center transition-[transform,box-shadow] sm:p-[26px_20px] sm:hover:-translate-y-1 sm:hover:shadow-[0_20px_40px_-18px_rgba(15,42,74,0.2)]">
      <div className="mx-auto mb-4 flex size-9 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue">
        <SectionIcon name={pillar.icon} className="size-[18px]" />
      </div>
      <h3 className="mb-2 font-serif text-[16.5px] leading-snug text-brand-navy">{pillar.title}</h3>
      <p className="text-[13.5px] leading-relaxed text-brand-gray">{pillar.description}</p>
    </article>
  );
}

export function EcosystemSection() {
  const { description, eyebrow, title } = ecosystemContent;

  return (
    <section id="ecossistema" className="bg-brand-offwhite section-spacing">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <div className="relative mt-5">
          <div
            aria-hidden
            className="absolute left-[8%] right-[8%] top-[38px] hidden h-px bg-brand-line lg:block"
          />
          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
