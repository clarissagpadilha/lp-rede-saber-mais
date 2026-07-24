import type { SVGProps } from "react";

export type TrustIconName = "graduation" | "ai" | "family";

type TrustIconProps = SVGProps<SVGSVGElement> & {
  name: TrustIconName;
};

export function TrustIcon({ name, className, ...props }: TrustIconProps) {
  if (name === "graduation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden className={className} {...props}>
        <path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinejoin="round" />
        <path d="M6 11v4.2c0 .9 2.7 2.8 6 2.8s6-1.9 6-2.8V11" />
        <path d="M22 8v5.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "ai") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...props}>
        <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth={1.6} />
        <text x="12" y="15.2" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700" fontFamily="sans-serif">
          IA
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden className={className} {...props}>
      <circle cx="8" cy="9" r="2.3" />
      <circle cx="16" cy="9" r="2.3" />
      <circle cx="12" cy="7.5" r="2.1" />
      <path d="M5 17.5c.7-2 2.4-3.2 4.5-3.2M15 17.5c.7-2 2.4-3.2 4.5-3.2" strokeLinecap="round" />
    </svg>
  );
}
