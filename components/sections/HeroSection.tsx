import { heroContent } from "@/content/hero";
import { ButtonLink, Container } from "@/components/ui";
import { cn } from "@/lib/utils";

import { HeroBackground } from "./hero/HeroBackground";

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function HeroCta({ className }: { className?: string }) {
  const { cta } = heroContent;

  return (
    <ButtonLink
      href={cta.href}
      variant="primary"
      className={cn("w-full rounded-lg px-5 py-3.5 sm:w-auto", className)}
    >
      {cta.label}
      <ChevronRightIcon className="size-4" />
    </ButtonLink>
  );
}

function HeroCopy({ mobile }: { mobile?: boolean }) {
  const { eyebrow, mobileSubheadlineLines, mobileTitleLines, subheadline, title } = heroContent;

  return (
    <>
      <p
        className={cn(
          "w-fit rounded-full border border-brand-blue/20 bg-white/90 font-mono font-medium uppercase text-brand-blue",
          mobile
            ? "mx-auto mb-3 flex whitespace-nowrap px-2.5 py-1 text-[8.5px] leading-none tracking-[0.035em]"
            : "mb-4 inline-flex px-4 py-1.5 text-[10.5px] tracking-[0.08em] sm:text-[11px]",
        )}
      >
        {eyebrow}
      </p>

      <h1
        className={cn(
          "flex flex-col font-manrope font-[800] tracking-[-0.02em] text-brand-navy",
          mobile
            ? "gap-0.5 text-center text-[clamp(1.45rem,7vw,1.75rem)] leading-[1.05]"
            : "text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.08]",
        )}
      >
        {mobile
          ? mobileTitleLines.map((line) =>
              "highlight" in line ? (
                <span key={line.highlight}>
                  {line.before}
                  <span className="text-brand-orange">{line.highlight}</span>
                </span>
              ) : (
                <span key={line.text}>{line.text}</span>
              ),
            )
          : title.lines.map((line) => (
              <span key={line.text} className={line.highlight ? "text-brand-orange" : undefined}>
                {line.text}
              </span>
            ))}
      </h1>

      {mobile ? (
        <p className="mt-3 max-w-[520px] text-center text-[14px] leading-relaxed text-brand-gray">
          {mobileSubheadlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      ) : (
        <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-brand-gray sm:mt-5 sm:text-[16px] lg:text-[17px]">
          {subheadline}
        </p>
      )}
    </>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className={cn(
        "relative flex w-full flex-col overflow-hidden",
        "min-h-[calc(100vw*1024/485)]",
        "lg:min-h-[max(720px,50vw)]",
      )}
    >
      <HeroBackground />

      {/* Desktop e tablet — layout original */}
      <Container className="relative z-[1] hidden flex-1 items-center pb-8 pt-[calc(var(--header-height)+1.75rem)] sm:flex md:pb-10 md:pt-[calc(var(--header-height)+2.25rem)] lg:pb-12 lg:pt-[calc(var(--header-height)+2.75rem)]">
        <div className="w-full max-w-[580px] md:max-w-[520px] lg:max-w-[560px]">
          <HeroCopy />
          <div className="mt-7 sm:mt-8">
            <HeroCta />
          </div>
        </div>
      </Container>

      {/* Mobile — conteúdo no topo, CTA no final da imagem */}
      <Container className="relative z-[1] flex min-h-[calc(100vw*1024/485)] flex-1 flex-col justify-between pb-8 pt-[calc(var(--header-height)+0.625rem)] sm:hidden">
        <div className="w-full max-w-[580px]">
          <HeroCopy mobile />
        </div>
        <div className="w-full max-w-[580px]">
          <HeroCta />
        </div>
      </Container>
    </section>
  );
}
