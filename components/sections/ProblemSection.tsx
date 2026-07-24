import { Container, Eyebrow, SectionIcon } from "@/components/ui";
import { problemContent } from "@/content/problem";

export function ProblemSection() {
  const { description, eyebrow, items, title } = problemContent;

  return (
    <section id="problema" className="bg-brand-white section-spacing">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-4 text-brand-orange-dark before:block before:h-px before:w-5 before:bg-brand-orange before:content-['']">
              {eyebrow}
            </Eyebrow>
            <h2 className="max-w-[480px] font-serif text-[clamp(1.625rem,3.2vw,2.25rem)] leading-[1.25] text-brand-navy">
              {title}
            </h2>
            <p className="mt-[18px] max-w-[460px] text-[16.5px] text-brand-gray">{description}</p>
          </div>

          <div className="rounded-[20px] border border-brand-line bg-brand-blue-mist p-8 sm:p-10">
            <ul className="divide-y divide-brand-line">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0">
                  <SectionIcon
                    name="plus-circle"
                    className="mt-0.5 size-5 shrink-0 text-brand-orange-dark"
                  />
                  <span className="text-[14.5px] font-medium text-brand-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
