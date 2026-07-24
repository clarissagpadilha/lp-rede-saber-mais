import Link from "next/link";

import { SiteShell } from "@/components/layout";
import { Container } from "@/components/ui";
import { createPageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: `Política de Privacidade | ${siteConfig.name}`,
  description: `Política de Privacidade provisória da ${siteConfig.name}. Conteúdo definitivo sujeito a validação jurídica.`,
  path: "/politica-de-privacidade",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <main className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h1 className="font-serif text-3xl text-brand-navy">Política de Privacidade</h1>
          <p className="mt-4 text-brand-gray">
            Esta é uma versão provisória da Política de Privacidade da {siteConfig.name}. O conteúdo
            definitivo será publicado após validação jurídica.
          </p>

          <section className="mt-10 space-y-4 text-brand-gray">
            <h2 className="font-serif text-xl text-brand-navy">1. Dados coletados</h2>
            <p>
              Ao preencher o formulário de contato, podemos coletar nome, e-mail, telefone, cargo,
              empresa ou instituição e demais informações fornecidas voluntariamente.
            </p>

            <h2 className="font-serif text-xl text-brand-navy">2. Finalidade do tratamento</h2>
            <p>
              Os dados são utilizados exclusivamente para retornar contato e apresentar informações
              sobre o Plano de Educação Rede Saber Mais.
            </p>

            <h2 className="font-serif text-xl text-brand-navy">3. Compartilhamento</h2>
            <p>
              Não compartilhamos dados pessoais com terceiros, exceto quando necessário para cumprir
              obrigação legal ou prestar o serviço solicitado.
            </p>

            <h2 className="font-serif text-xl text-brand-navy">4. Seus direitos</h2>
            <p>
              Você pode solicitar acesso, correção ou exclusão dos seus dados por meio dos canais de
              contato disponíveis no site.
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
