# Rede Saber Mais — Landing Page

Landing page institucional do Plano de Educação Rede Saber Mais, construída com Next.js 16, React 19 e Tailwind CSS 4.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
LEAD_WEBHOOK_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_GTM_ID=
```

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site (obrigatória em produção para SEO e indexação) |
| `LEAD_WEBHOOK_URL` | Endpoint webhook para recebimento de leads (servidor, nunca exposto ao client) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp com DDI (ex.: `5511999999999`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Reservado para uso futuro (ex.: contato exibido no site) |
| `NEXT_PUBLIC_GTM_ID` | Reservado para GTM (fase futura de mensuração) |

## Deploy na Vercel

### 1. Criar projeto

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New → Project**
3. Importe o repositório GitHub do projeto
4. Confirme o **Root Directory** como a raiz do repositório (`.`)

### 2. Configurar build

A Vercel detecta Next.js automaticamente:

- **Build Command:** `npm run build`
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install`

### 3. Variáveis de ambiente

Em **Settings → Environment Variables**, configure para **Production**:

| Variável | Obrigatória | Exemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Sim | `https://www.seudominio.com.br` |
| `LEAD_WEBHOOK_URL` | Sim | URL do webhook |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Não | `5511999999999` |

> Use a URL canônica **sem barra final** em `NEXT_PUBLIC_SITE_URL`.

### 4. Deploy

1. Faça push para a branch conectada (geralmente `main`)
2. A Vercel gera um preview a cada PR e deploy de produção no merge
3. Após o deploy, valide `/`, `/robots.txt`, `/sitemap.xml` e o formulário

### 5. Domínio customizado

1. **Settings → Domains → Add**
2. Siga as instruções de DNS (CNAME ou A record)
3. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final
4. Redeploy para regenerar canonical, sitemap e robots

### 6. Validar após deploy

- **Formulário:** envie um lead de teste e confirme recebimento no webhook
- **GTM:** quando `NEXT_PUBLIC_GTM_ID` for configurado, valide no Tag Assistant
- **Sitemap:** acesse `https://seu-dominio.com.br/sitemap.xml`
- **SEO:** use Rich Results Test e Sharing Debugger

### 7. Rollback

Em **Deployments**, selecione um deploy anterior estável e clique em **Promote to Production**.

## SEO e publicação

### Configurar URL canônica

Defina `NEXT_PUBLIC_SITE_URL` com o domínio final, **sem barra no final**:

```env
NEXT_PUBLIC_SITE_URL=https://www.seudominio.com.br
```

A indexação (`robots`, `sitemap`, `canonical`) só é habilitada quando:

- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL` está definida
- A URL **não** é localhost

### Atualizar title e description

Edite `config/seo.ts`:

- `SEO.title`
- `SEO.description`
- `SEO.keywords`

Use `createPageMetadata()` para páginas internas.

### Trocar imagem Open Graph

Substitua o arquivo:

`public/images/social/og-rede-saber-mais.jpg`

Requisitos: **1200×630 px**, JPEG, sem textos incorretos ou dados não confirmados.

Para regenerar a versão provisória:

```bash
npm run generate:seo-assets
```

### Trocar favicon e ícones

Substitua:

- `app/icon.png` (32×32)
- `app/apple-icon.png` (180×180)
- `public/favicon.ico`

Depois execute `npm run generate:seo-assets` se precisar regenerar derivados.

### Otimizar imagens

Converta PNGs pesados para WebP antes do deploy:

```bash
npm run optimize:images
```

Arquivos gerados: `public/images/hero/hero-background.webp`, `public/images/sections/family.webp`.

### Validar sitemap

Em produção, acesse:

`https://seu-dominio.com.br/sitemap.xml`

Deve listar:

- `/`
- `/politica-de-privacidade`
- `/termos-de-uso`

Em desenvolvimento/local, o sitemap é gerado vazio para evitar indexação acidental.

### Validar robots

Em produção:

`https://seu-dominio.com.br/robots.txt`

Deve permitir indexação e apontar para o sitemap.

Em localhost/preview sem `NEXT_PUBLIC_SITE_URL`, a indexação é bloqueada.

### Testar Open Graph

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [metatags.io](https://metatags.io/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Testar dados estruturados

- [Google Rich Results Test](https://search.google.com/test/rich-results)

Schemas implementados na home:

- `Organization`
- `WebSite`
- `FAQPage` (sincronizado com `content/faq.ts`)

### Google Search Console

1. Verifique a propriedade do domínio
2. Envie o sitemap (`/sitemap.xml`)
3. Solicite indexação da home
4. Monitore erros de cobertura e rich results

### Checklist antes de publicar

Consulte [PENDENCIAS-PARA-PUBLICACAO.md](./PENDENCIAS-PARA-PUBLICACAO.md).

- [ ] `NEXT_PUBLIC_SITE_URL` configurada
- [ ] `LEAD_WEBHOOK_URL` configurada e testada
- [ ] OG image definitiva publicada
- [ ] Favicon definitivo publicado
- [ ] Política de Privacidade e Termos validados juridicamente
- [ ] Rich Results Test sem erros
- [ ] Preview social correto
- [ ] Formulário testado em produção
- [ ] Lighthouse executado (mobile e desktop)

## Scripts

```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run start            # Servidor de produção
npm run lint             # ESLint
npm run typecheck        # Verificação TypeScript
npm run optimize:images  # Converte imagens pesadas para WebP
npm run generate:seo-assets  # Regenera OG, favicon e ícones
```

## Estrutura principal

```
app/                  # Rotas, layout, metadata, sitemap, robots, manifest, API
components/           # UI, seções, layout, marketing
config/               # site.ts, seo.ts
content/              # Copy tipada
lib/                  # Utilitários (UTM, leads, site-url, JSON-LD)
public/images/        # Assets estáticos
scripts/              # Otimização de imagens e assets SEO
```

## Pendências

Ver [PENDENCIAS-PARA-PUBLICACAO.md](./PENDENCIAS-PARA-PUBLICACAO.md) para o checklist completo de publicação.
