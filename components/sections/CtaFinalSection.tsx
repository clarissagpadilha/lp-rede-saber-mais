import { ButtonLink, Container } from "@/components/ui";
import { ctaFinalContent } from "@/content/cta-final";

export function CtaFinalSection() {
  const { cta, description, title } = ctaFinalContent;

  return (
    <section
      id="cta-final"
      className="relative overflow-hidden bg-brand-navy section-spacing text-center text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_0%,rgba(232,114,44,0.18),transparent_60%)]"
      />
      <Container className="relative z-[1]">
        <h2 className="mx-auto max-w-[680px] font-serif text-[clamp(1.75rem,3.8vw,2.625rem)] leading-snug text-white">
          {title}
        </h2>
        <p className="mx-auto mt-[18px] max-w-[560px] text-[17px] text-white/72">{description}</p>
        <div className="mt-8">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
