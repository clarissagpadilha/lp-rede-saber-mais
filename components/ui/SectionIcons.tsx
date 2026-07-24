import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
};

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M6 8v4l6 4M18 8v4l-6 4" />
    </svg>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function PlusCircleIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

export function BarChartIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </svg>
  );
}

export function UserCircleIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 21v-7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function ZapIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
      <path d="M14 4h6v6M10 14L20 4" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
    </svg>
  );
}

export function AwardIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8 14l-2 7 6-3 6 3-2-7" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const iconMap = {
  network: NetworkIcon,
  monitor: MonitorIcon,
  user: UserIcon,
  book: BookIcon,
  layers: LayersIcon,
  "check-circle": CheckCircleIcon,
  "plus-circle": PlusCircleIcon,
  "bar-chart": BarChartIcon,
  "user-circle": UserCircleIcon,
  zap: ZapIcon,
  clock: ClockIcon,
  heart: HeartIcon,
  users: UsersIcon,
  "external-link": ExternalLinkIcon,
  sun: SunIcon,
  shield: ShieldIcon,
  award: AwardIcon,
} as const;

export type SectionIconName = keyof typeof iconMap;

type SectionIconProps = IconProps & {
  name: SectionIconName | string;
};

export function SectionIcon({ name, className, ...props }: SectionIconProps) {
  const Icon = iconMap[name as SectionIconName];
  if (!Icon) return null;
  return <Icon className={className} {...props} />;
}
