import { Container, SectionHeader } from "@/components/ui";
import { sponsorSlots, sponsorsContent } from "@/content/sponsors";
import { cn } from "@/lib/utils";

export function SponsorsSection() {
  const { description, eyebrow, title } = sponsorsContent;

  return (
    <section id="patrocinadores" className="section-spacing bg-white">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {sponsorSlots.map((slot) => {
            const label = slot.name?.trim() || "Patrocinador em breve";
            const content = (
              <>
                <span
                  className={cn(
                    "flex size-[4.75rem] items-center justify-center rounded-full border bg-brand-blue-mist/40 sm:size-[5.5rem]",
                    slot.logoSrc
                      ? "border-brand-line/80 p-3"
                      : "border-dashed border-brand-line/90 text-brand-ink/35",
                  )}
                >
                  {slot.logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slot.logoSrc}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <PartnerIcon className="size-7 sm:size-8" />
                  )}
                </span>
                <span className="mt-3 text-center text-[12.5px] font-medium text-brand-gray/80 sm:text-[13px]">
                  {label}
                </span>
              </>
            );

            return (
              <li key={slot.id} className="flex flex-col items-center">
                {slot.href ? (
                  <a
                    href={slot.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (abre em nova aba)`}
                    className="flex flex-col items-center transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                  >
                    {content}
                  </a>
                ) : (
                  <div aria-label={label} className="flex flex-col items-center">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function PartnerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
    >
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M8 13h8M8 16h5" />
    </svg>
  );
}
