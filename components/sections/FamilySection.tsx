import { Container, Eyebrow, YouTubeEmbed } from "@/components/ui";
import { familyContent } from "@/content/family";

export function FamilySection() {
  const { description, eyebrow, micro, title, video } = familyContent;

  return (
    <section id="familia" className="overflow-hidden bg-brand-blue section-spacing text-white">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <Eyebrow className="mb-4 justify-start text-[#FFD9BB] before:bg-[#FFD9BB]">
              {eyebrow}
            </Eyebrow>
            <h2 className="font-serif text-[clamp(1.625rem,3.2vw,2.375rem)] leading-[1.2] text-white">
              {title.map((part) => (
                <span key={part.text} className={part.highlight ? "text-brand-orange" : undefined}>
                  {part.text}
                </span>
              ))}
            </h2>
            <p className="mt-[18px] max-w-[520px] text-[16.5px] leading-relaxed text-white/82">{description}</p>
            <p className="mt-5 text-[13px] italic text-white/60">{micro}</p>
          </div>

          <YouTubeEmbed
            videoId={video.id}
            title={video.title}
            startSeconds={video.startSeconds}
          />
        </div>
      </Container>
    </section>
  );
}
