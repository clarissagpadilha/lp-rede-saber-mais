import type { ReactNode } from "react";

import { Footer, Header } from "@/components/layout";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
