import { Container, SectionHeader, SectionIcon } from "@/components/ui";
import { benefits, benefitsContent } from "@/content/benefits";

export function BenefitsSection() {
  const { eyebrow, title } = benefitsContent;

  return (
    <section id="beneficios" className="section-spacing">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.id}
              className="rounded-brand border border-brand-line bg-brand-blue-mist p-7"
            >
              <SectionIcon name={benefit.icon} className="mb-3.5 size-[22px] text-brand-orange-dark" />
              <p className="text-[15px] font-medium leading-relaxed text-brand-ink">{benefit.title}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
