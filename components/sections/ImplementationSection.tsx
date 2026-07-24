import { Container, SectionHeader } from "@/components/ui";
import { implementationContent, steps } from "@/content/steps";

export function ImplementationSection() {
  const { eyebrow, title } = implementationContent;

  return (
    <section id="implementacao" className="bg-brand-blue section-spacing text-white">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          eyebrowClassName="text-[#FFD9BB] before:bg-[#FFD9BB]"
          titleClassName="text-white"
        />

        <ol className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.id} className="relative pt-11">
              <span
                aria-hidden
                className="absolute left-0 top-0 font-mono text-[13px] text-[#FFD9BB]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="absolute left-[34px] right-0 top-2 hidden h-px bg-white/20 lg:block last:hidden"
              />
              <h3 className="mb-2 font-serif text-[15.5px] text-white">{step.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-white/80">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
