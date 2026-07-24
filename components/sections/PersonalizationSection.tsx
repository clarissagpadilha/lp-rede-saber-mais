import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { personalizationContent } from "@/content/personalization";

export function PersonalizationSection() {
  const { cta, description, eyebrow, title } = personalizationContent;

  return (
    <section id="personalizacao" className="bg-brand-navy section-spacing text-center text-white">
      <Container className="max-w-[640px]">
        <Eyebrow className="mb-4 justify-center text-[#FFD9BB] before:bg-[#FFD9BB]">
          {eyebrow}
        </Eyebrow>
        <h2 className="font-serif text-[clamp(1.625rem,3.4vw,2.25rem)] leading-snug text-white">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[16.5px] text-white/70">{description}</p>
        <div className="mt-8">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
