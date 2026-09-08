<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Colibri Auto

Site de um **stand de automóveis**, a Colibri Auto, em Perafita (Matosinhos). Qualidade visual de nível profissional, âmbito pequeno e vigiado. Conteúdo em **PT-PT**.

Fork do `DEVV-TGR/StandDemo` (o site do Império Auto Concept). O primeiro commit é a base intacta — a arquitectura, as rotas e os componentes vêm de lá e não se tocaram. O que mudou foi identidade, dados e conteúdo.

**A demo ainda não foi apresentada ao cliente.** O que ficou assumido por falta de dados está em [`docs/por-confirmar.md`](docs/por-confirmar.md) — ler antes de mexer em `src/data/` ou em metadata.

O site público responde **sem variáveis de ambiente** — sem base de dados serve o inventário estático de `src/data/viaturas.ts`, e sem chave do Resend os formulários de `/compramos` e `/importamos` imprimem o email no terminal (em desenvolvimento) ou encaminham para o WhatsApp (em produção). O CI compila e arranca sem nenhuma variável definida, e é essa a regra que mantém a montra de pé quando o painel avaria.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · motion v12 · npm

Não há `tailwind.config.*` — o tema vive em `src/app/globals.css`.

## Antes de mexer em código, ler

O sistema de design está documentado em **[`docs/brand/`](docs/brand/)** — dez documentos prescritivos, extraídos do código, com valores literais e regras do que não fazer. Começar pelo [índice e as dez regras não-negociáveis](docs/brand/README.md).

Consoante o que se vai tocar:

| Vais mexer em | Ler |
|---|---|
| Cor, superfícies, badges, overlays | [02 — Cor e matéria](docs/brand/02-cor-e-materia.md) |
| Headings, texto, rótulos | [03 — Tipografia](docs/brand/03-tipografia.md) |
| Secções, grelhas, espaçamento | [04 — Layout e espaço](docs/brand/04-layout-e-espaco.md) |
| Componentes e controlos | [05 — Componentes](docs/brand/05-componentes.md) |
| Animações e gestos | [06 — Movimento](docs/brand/06-movimento.md) |
| Texto visível, números, datas | [07 — Voz e conteúdo](docs/brand/07-voz-e-conteudo.md) |
| Dados, filtros, viaturas | [08 — Dados e domínio](docs/brand/08-dados-e-dominio.md) |
| Rotas, estado, convenções | [09 — Código e arquitetura](docs/brand/09-codigo-e-arquitetura.md) |
| Metadata, indexação, dados estruturados | [SEO — estado e convenções](docs/seo.md) |

Âmbito da demo e o que fica de fora: [01 — Produto e âmbito](docs/brand/01-produto-e-ambito.md).

Quando o código e a documentação divergirem, o código ganha — e o documento corrige-se no mesmo commit.

## Skills

Versionadas em `.agents/skills/` (symlinks em `.claude/skills/`, geridas via `npx skills` / `skills-lock.json`). Usar por defeito no trabalho de UI:

- **impeccable** — skill orquestradora principal para criar/rever/polir interfaces (sub-comandos: craft, audit, polish, animate, critique...).
- **emil-design-eng** + **animation-vocabulary** / **improve-animations** / **review-animations** — design engineering e qualidade de animações.
- **design-taste-frontend** / **high-end-visual-design** — critérios de bom gosto visual, evitar aspeto genérico de IA.
- **find-skills** — para descobrir e instalar novas skills quando necessário.

Existe também o plugin **frontend-design** (Anthropic) instalado a nível de utilizador.
