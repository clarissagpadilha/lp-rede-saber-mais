import { Container, SectionHeader, SectionIcon } from "@/components/ui";
import { complementaryContent, complementaryItems } from "@/content/complementary";

export function ComplementarySection() {
  const { description, eyebrow, title } = complementaryContent;

  return (
    <section id="complementares" className="bg-brand-white section-spacing">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <ul className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {complementaryItems.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3.5 rounded-brand-sm border border-brand-line p-[22px]"
            >
              <SectionIcon name={item.icon} className="mt-0.5 size-5 shrink-0 text-brand-blue" />
              <div>
                <h4 className="mb-1 text-[14.5px] text-brand-navy">{item.title}</h4>
                <p className="text-[12.5px] text-brand-gray-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
