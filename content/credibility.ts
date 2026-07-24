import type { TrustIconName } from "@/components/ui/TrustIcons";
import type { ContentItem } from "@/types";

export type CredibilityItem = ContentItem & {
  icon: TrustIconName;
  lines: readonly [string, string];
};

export const credibilityItems: CredibilityItem[] = [
  {
    id: "ecosystem",
    icon: "graduation",
    lines: ["Ecossistema educacional", "integrado"],
  },
  {
    id: "ai",
    icon: "ai",
    lines: ["Inteligência artificial", "aplicada à educação"],
  },
  {
    id: "family",
    icon: "family",
    lines: ["Possibilidade de acesso", "para toda a família"],
  },
];
