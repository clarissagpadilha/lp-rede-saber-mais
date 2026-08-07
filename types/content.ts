export type NavLinkChild = {
  label: string;
  href: string;
  hasSubmenu?: boolean;
};

export type NavLink = {
  label: string;
  href?: string;
  children?: NavLinkChild[];
};

export type IconName = string;

export type ContentItem = {
  id: string;
};

export type PillarItem = ContentItem & {
  title: string;
  description: string;
  icon: IconName;
};

export type BenefitItem = ContentItem & {
  title: string;
  icon: IconName;
};

export type SegmentItem = ContentItem & {
  label: string;
  title: string;
  description: string;
};

export type StepItem = ContentItem & {
  title: string;
  description: string;
};

export type ComplementaryItem = ContentItem & {
  title: string;
  description: string;
  icon: IconName;
};

export type FaqItem = ContentItem & {
  question: string;
  answer: string;
};

export type FooterColumn = {
  title: string;
  links: NavLinkChild[];
};

export type SponsorSlot = ContentItem & {
  name?: string;
  logoSrc?: string;
  href?: string;
};
