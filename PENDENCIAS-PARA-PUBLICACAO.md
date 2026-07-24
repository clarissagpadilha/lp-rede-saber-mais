# Pendências para publicação — Rede Saber Mais LP

Checklist final antes de colocar a landing page no ar.

## Bloqueadores

- [ ] Configurar `LEAD_WEBHOOK_URL` e testar envio de leads em produção
- [ ] Configurar `NEXT_PUBLIC_WHATSAPP_NUMBER` (se houver número oficial)
- [ ] Definir domínio final e configurar `NEXT_PUBLIC_SITE_URL` (sem barra final)
- [ ] Publicar Política de Privacidade definitiva (remover `noindex` após validação jurídica)
- [ ] Publicar Termos de Uso definitivos (remover `noindex` após validação jurídica)
- [ ] Inserir logo PNG oficial em alta qualidade (`public/logo/logo-rede-saber-mais.png`)
- [ ] Substituir imagem Open Graph definitiva (`public/images/social/og-rede-saber-mais.jpg`, 1200×630)
- [ ] Substituir favicon e ícones definitivos (`app/icon.png`, `app/apple-icon.png`)
- [ ] Substituir imagem provisória da seção família (`public/images/sections/family.webp`)
- [ ] Validar variáveis de ambiente na Vercel antes do deploy

## Mensuração

- [ ] Configurar `NEXT_PUBLIC_GTM_ID` (quando aprovado)
- [ ] Configurar GA4 via GTM
- [ ] Configurar Google Ads (quando aplicável)
- [ ] Configurar Meta Pixel (quando aprovado)
- [ ] Testar eventos: `lp_view`, `form_start`, `scroll_50`, `scroll_90`, CTAs, WhatsApp, FAQ, segmentos
- [ ] Banner de cookies / Consent Mode (LGPD) — fase futura

## SEO

- [ ] Validar canonical em produção (não pode apontar para localhost)
- [ ] Validar sitemap em produção (`/sitemap.xml`)
- [ ] Validar robots em produção (`/robots.txt` — deve permitir indexação)
- [ ] Configurar Google Search Console
- [ ] Enviar sitemap no Search Console
- [ ] Testar preview Open Graph e Twitter Card
- [ ] Validar dados estruturados no [Google Rich Results Test](https://search.google.com/test/rich-results)

## Conteúdo

- [ ] Validar copy de title e description
- [ ] Validar tempo de experiência (seção Experiência)
- [ ] Validar empresa responsável e dados institucionais
- [ ] Validar recursos, certificados e FAQs omitidas após validação comercial/jurídica
- [ ] Validar Instagram oficial (`@plataformaredesabermais`)
- [ ] Validar site oficial (`redesabermais.com`)
- [ ] Revisar alt texts após troca de imagens definitivas

## QA

- [ ] Testar mobile em 320 px, 375 px e 430 px
- [ ] Testar formulário (sucesso, erro de validação, erro de webhook)
- [ ] Testar links internos e externos
- [ ] Verificar console do navegador (sem erros)
- [ ] Executar Lighthouse (Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 95)
- [ ] Testar navegação por teclado (menu, FAQ, tabs, formulário)
- [ ] Testar UTMs (`utm_source`, `gclid`, etc.) no payload do lead

## Comandos úteis antes do deploy

```bash
npm run lint
npm run typecheck
npm run optimize:images
npm run build
npm run start
```

Após deploy na Vercel:

- Acessar `/robots.txt`
- Acessar `/sitemap.xml`
- Acessar `/manifest.webmanifest`
- Testar formulário com webhook real
- Validar metadata e preview social
