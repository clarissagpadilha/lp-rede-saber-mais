import { Container, TrustIcon } from "@/components/ui";
import { credibilityItems } from "@/content/credibility";

export function CredibilityBar() {
  return (
    <section
      aria-label="Credibilidade"
      className="border-y border-white/[0.08] bg-brand-navy py-9 sm:py-10"
    >
      <Container>
        <ul className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-white/10">
          {credibilityItems.map((item) => {
            const [primary, secondary] = item.lines;
            const label = `${primary} ${secondary}`;

            return (
              <li key={item.id} className="flex min-w-0 items-center justify-center px-2 sm:px-5 lg:px-8">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 ring-1 ring-brand-orange/25 sm:size-10">
                    <TrustIcon name={item.icon} className="size-[17px] text-brand-orange sm:size-[19px]" />
                  </span>
                  <span className="min-w-0 text-left" aria-label={label}>
                    <span className="block text-[11px] font-semibold leading-tight text-white sm:text-[13px]">
                      {primary}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-tight text-white/65 sm:text-[12px]">
                      {secondary}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
