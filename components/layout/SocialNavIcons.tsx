import { socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";

const iconById = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
} as const;

type SocialNavIconsProps = {
  darkTheme?: boolean;
  className?: string;
  iconClassName?: string;
};

export function SocialNavIcons({
  darkTheme = false,
  className,
  iconClassName,
}: SocialNavIconsProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label="Redes sociais"
    >
      {socialLinks.map(({ id, label, href }) => {
        const Icon = iconById[id];

        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (abre em nova aba)`}
            className={cn(
              "inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              darkTheme
                ? "border-white/20 bg-white/10 text-white hover:border-white/35 hover:bg-white/20 focus-visible:outline-white"
                : "border-brand-line/80 bg-brand-blue-mist/70 text-brand-navy/75 hover:border-brand-blue/25 hover:bg-brand-blue-mist hover:text-brand-blue focus-visible:outline-brand-blue",
            )}
          >
            <Icon className={cn("size-4", iconClassName)} />
          </a>
        );
      })}
    </div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 22v-8.5h2.8l.4-3.2h-3.2V8.1c0-.9.3-1.6 1.7-1.6H17V3.4C16.4 3.3 15.2 3 13.8 3 11 3 9.1 4.5 9.1 7.7V10.3H6.5v3.2h2.6V22h4.4z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.5 9.5H3.8V21h2.7V9.5zM5.15 3a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM9.2 9.5H11.8v1.6h.05c.35-.65 1.2-1.35 2.45-1.35 2.6 0 3.1 1.7 3.1 3.95V21h-2.8v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.55-2.3 3.15V21H9.2V9.5z" />
    </svg>
  );
}
