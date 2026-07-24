import Link from "next/link";

import { Container } from "@/components/ui";
import { footerContent } from "@/content/footer";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { brand, columns, copyright, description } = footerContent;

  return (
    <footer className="bg-brand-navy text-white/70">
      <Container className="py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 font-serif text-[19px] font-semibold text-white">{brand}</div>
            <p className="max-w-[280px] text-[13.5px] leading-relaxed">{description}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-3.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white/50">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={`${column.title}-${link.href}`}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.label} (abre em nova aba)`}
                          className="text-[13.5px] text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13.5px] text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-white/45">
          <span>{copyright}</span>
          <a
            href={siteConfig.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site oficial Rede Saber Mais (abre em nova aba)"
            className="transition-colors hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {siteConfig.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </Container>
    </footer>
  );
}
