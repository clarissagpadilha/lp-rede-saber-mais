import { Container } from "@/components/ui";
import { experienceContent } from "@/content/experience";

export function ExperienceSection() {
  const { description, title } = experienceContent;

  return (
    <section id="experiencia" className="bg-brand-blue-mist section-spacing">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-14">
          <div
            aria-hidden
            className="font-serif text-[clamp(2.75rem,8vw,4rem)] leading-none text-brand-blue opacity-25"
          >
            “
          </div>
          <div>
            <h2 className="mb-3.5 font-serif text-[26px] leading-snug text-brand-navy">{title}</h2>
            <p className="max-w-[600px] text-base text-brand-gray">{description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
