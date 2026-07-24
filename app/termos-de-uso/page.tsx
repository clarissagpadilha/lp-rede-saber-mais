import Link from "next/link";

import { SiteShell } from "@/components/layout";
import { Container } from "@/components/ui";
import { createPageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: `Termos de Uso | ${siteConfig.name}`,
  description: `Termos de Uso provisórios da ${siteConfig.name}. Conteúdo definitivo sujeito a validação jurídica.`,
  path: "/termos-de-uso",
  noIndex: true,
});

export default function TermsOfUsePage() {
  return (
    <SiteShell>
      <main className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h1 className="font-serif text-3xl text-brand-navy">Termos de Uso</h1>
          <p className="mt-4 text-brand-gray">
            Esta é uma versão provisória dos Termos de Uso da {siteConfig.name}. O conteúdo definitivo
            será publicado após validação jurídica.
          </p>

          <section className="mt-10 space-y-4 text-brand-gray">
            <h2 className="font-serif text-xl text-brand-navy">1. Objeto</h2>
            <p>
              Estes termos regulam o uso deste site institucional e o envio de solicitações de contato
              relacionadas ao Plano de Educação Rede Saber Mais.
            </p>

            <h2 className="font-serif text-xl text-brand-navy">2. Uso do site</h2>
            <p>
              O visitante compromete-se a utilizar o site de forma lícita, fornecendo informações
              verdadeiras ao preencher formulários de contato.
            </p>

            <h2 className="font-serif text-xl text-brand-navy">3. Propriedade intelectual</h2>
            <p>
              Textos, marcas, logotipos e demais conteúdos exibidos neste site pertencem à{" "}
              {siteConfig.name} ou a seus licenciadores, sendo vedada a reprodução sem autorização.
            </p>

            <h2 className="font-serif text-xl text-brand-navy">4. Alterações</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento. Recomendamos a consulta periódica
              desta página.
            </p>
          </section>

          <p className="mt-10">
            <Link
              href="/"
              className="font-semibold text-brand-blue underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Voltar para a página inicial
            </Link>
          </p>
        </Container>
      </main>
    </SiteShell>
  );
}
