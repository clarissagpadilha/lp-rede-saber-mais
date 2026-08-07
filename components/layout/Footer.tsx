import Link from "next/link";

import { Container } from "@/components/ui";
import { footerContent } from "@/content/footer";

import { FooterContact } from "./FooterContact";

export function Footer() {
  const { brand, columns, contact, copyright, credits, description } = footerContent;

  return (
    <footer className="bg-brand-navy text-white/70">
      <Container className="py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 font-serif text-[19px] font-semibold text-white">{brand}</div>
            <p className="max-w-[280px] text-[13.5px] leading-relaxed">{description}</p>
          </div>

          {columns[0] ? (
            <div key={columns[0].title}>
              <h4 className="mb-3.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white/50">
                {columns[0].title}
              </h4>
              <ul className="space-y-2.5">
                {columns[0].links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={`${columns[0].title}-${link.href}`}>
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
          ) : null}

          <FooterContact whatsapp={contact.whatsapp} email={contact.email} />

          {columns.slice(1).map((column) => (
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

        <p className="pt-6 text-center text-xs text-white/45">
          {copyright}{" "}
          Criado por{" "}
          <a
            href={credits.agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${credits.agencyName} (abre em nova aba)`}
            className="text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {credits.agencyName}
          </a>
        </p>
      </Container>
    </footer>
  );
}
