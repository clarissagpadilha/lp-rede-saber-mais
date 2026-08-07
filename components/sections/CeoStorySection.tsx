import Image from "next/image";

import { Container, Eyebrow } from "@/components/ui";
import { ceoStoryContent } from "@/content/ceo-story";

export function CeoStorySection() {
  const { eyebrow, image, name, paragraphs, role } = ceoStoryContent;

  return (
    <section id="ceo" className="section-spacing bg-brand-blue-mist/45">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-orange/10"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-brand-line/80 bg-white shadow-[0_20px_48px_-24px_rgba(15,42,74,0.28)]">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 420px, 480px"
                  className="object-cover"
                />
              ) : (
                <CeoImagePlaceholder name={name} />
              )}
            </div>
          </div>

          <div className="min-w-0">
            <Eyebrow className="mb-4 justify-start text-brand-orange-dark before:bg-brand-orange">
              {eyebrow}
            </Eyebrow>
            <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.15] text-brand-navy">
              {name}
            </h2>
            <p className="mt-2 text-[15px] font-semibold text-brand-blue">{role}</p>
            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-relaxed text-brand-gray">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CeoImagePlaceholder({ name }: { name: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-brand-blue-mist to-white px-6 text-center">
      <span className="mb-3 flex size-16 items-center justify-center rounded-full border border-dashed border-brand-line bg-white/80 text-brand-ink/30">
        <UserIcon className="size-7" />
      </span>
      <span className="text-[13px] font-medium text-brand-gray/75">Foto em breve</span>
      <span className="mt-1 text-[12px] text-brand-gray/60">{name}</span>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}
