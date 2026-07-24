import type { ReactNode } from "react";

import { Eyebrow, SectionLabel } from "@/components/ui";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export function SectionHeader({
  centered = true,
  description,
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const content = (
    <>
      {eyebrow ? (
        <Eyebrow
          className={cn(
            "mb-4 text-brand-orange-dark before:block before:h-px before:w-5 before:bg-brand-orange before:content-['']",
            centered && "justify-center",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-brand-navy",
          titleClassName,
        )}
      >
        {title.split("\n").map((line, index, lines) => (
          <span key={line}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </h2>
      {description ? (
        <p className={cn("mt-3.5 max-w-[640px] text-[17px] leading-relaxed text-brand-gray", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </>
  );

  if (centered) {
    return <SectionLabel>{content}</SectionLabel>;
  }

  return <div className="mb-14 max-w-[680px]">{content}</div>;
}
