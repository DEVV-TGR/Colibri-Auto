# Colibri Auto

Site do stand de automóveis **Colibri Auto**, na Avenida Maria Brito 3343, Perafita (Matosinhos) — catálogo de viaturas, fichas detalhadas, contactos, e os pedidos de avaliação e de viatura por encomenda. Conteúdo em português europeu.

> **Estado: proposta.** Isto ainda não foi apresentado ao cliente. O que está aqui foi construído a partir das fontes públicas deles — o [Instagram](https://www.instagram.com/colibriauto_stand/) e o [perfil no Standvirtual](https://colibriauto.standvirtual.com/inventory) — para levar à reunião um site a funcionar em vez de uma proposta em papel. O que falta confirmar com eles está em [`docs/por-confirmar.md`](docs/por-confirmar.md), e é curto.

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
```

Não é preciso configurar nada: as viaturas vivem em `src/data/viaturas.ts` e o site corre sem base de dados nem variáveis de ambiente. Sem `RESEND_API_KEY`, os pedidos enviados por `/compramos` e `/importamos` saem no terminal em vez de irem por email — dá para percorrer o formulário todo sem configurar serviço nenhum.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint sobre `src/` |
| `npm run check:seo` | Valida a metadata de todas as rotas |
| `npm run check:contraste` | Verifica o contraste WCAG dos pares de cor do sistema |
| `npx tsc --noEmit` | Verificação de tipos |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · motion v12

Não há `tailwind.config.*` — o tema vive em `src/app/globals.css`.

## De onde vem

Fork do [`DEVV-TGR/StandDemo`](https://github.com/DEVV-TGR/StandDemo), o site do Império Auto Concept, que existe precisamente para ser reaproveitado. O primeiro commit é a base intacta; a partir daí o diff mostra exactamente o que muda de um stand para o outro — cor, tipografia, identidade, dados e conteúdo. A arquitectura, as rotas e os componentes não se tocaram.

## Antes de mexer em código

O sistema de design está documentado em [`docs/brand/`](docs/brand/), com valores literais e regras do que não fazer. As convenções de trabalho e o índice completo estão em [`AGENTS.md`](AGENTS.md).

O painel de gestão está em [`docs/admin/`](docs/admin/), incluindo as [tarefas de configuração e os custos](docs/admin/07-tarefas-e-custos.md). **Não está configurado** — não há base de dados, bucket nem chave de email, e o site não precisa deles para correr.

## Alojamento

Vercel, no plano **Pro** — o Hobby proíbe uso comercial, e um site que anuncia a venda de viaturas é uso comercial. Ver [`docs/admin/07`](docs/admin/07-tarefas-e-custos.md).

---

Feito por [DevPlus](https://devplus.pt).
