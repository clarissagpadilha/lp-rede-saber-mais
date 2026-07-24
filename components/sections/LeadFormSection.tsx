import { Container } from "@/components/ui";
import { formContent } from "@/content/form";

import { LeadForm } from "./lead-form/LeadForm";

export function LeadFormSection() {
  const { description, title } = formContent;

  return (
    <section id="formulario" className="bg-brand-offwhite section-spacing">
      <Container>
        <div className="mx-auto max-w-[760px] rounded-[20px] border border-brand-line bg-white p-6 shadow-[0_24px_60px_-28px_rgba(15,42,74,0.16)] sm:p-10 lg:p-12">
          <h2 className="text-center font-serif text-[clamp(1.375rem,3.5vw,1.625rem)] text-brand-navy">{title}</h2>
          <p className="mx-auto mt-3 max-w-[480px] text-center text-[15px] text-brand-gray">
            {description}
          </p>

          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
