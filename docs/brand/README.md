# Sistema de design — Colibri Auto

Documentação da linguagem visual e das convenções do projeto. **Descreve o que o código faz hoje**, não intenções: cada regra foi extraída de `src/` e os valores são literais.

Serve dois leitores: um agente que precisa de escrever código consistente sem reler o `src/` inteiro, e uma pessoa que retoma o projeto passado algum tempo.

## Como usar

Antes de tocar em interface, ler o documento do domínio em causa. Cada ficheiro abre com um bloco de três linhas — *Aplica-se a*, *Fonte de verdade*, *Ler antes de* — e fecha com **`## Nunca`**, a lista do que não se faz neste projeto.

Quando o código e a documentação divergirem, **o código ganha** — e o documento deve ser corrigido no mesmo commit. As divergências internas já conhecidas estão registadas em secções `## Dívida conhecida`; estão documentadas de propósito, não escondidas.

## Índice

| Documento | O que responde |
|---|---|
| [01 — Produto e âmbito](01-produto-e-ambito.md) | O que é a demo, o que entra e o que fica de fora |
| [02 — Cor e matéria](02-cor-e-materia.md) | Tokens OKLCH, hierarquia do laranja, superfícies, e porque é que o "Vendido" não é vermelho |
| [03 — Tipografia](03-tipografia.md) | As três fontes, a escala fluida, o peso base, os seis papéis tipográficos |
| [04 — Layout e espaço](04-layout-e-espaco.md) | Container, ritmo vertical, grelhas, breakpoints, z-index |
| [05 — Componentes](05-componentes.md) | Contratos dos componentes, os quatro componentes de estrutura, e padrões transversais de UI |
| [06 — Movimento](06-movimento.md) | Easing canónico, entrada em scroll, gestos, reduced motion |
| [07 — Voz e conteúdo](07-voz-e-conteudo.md) | PT-PT, formatação com `Intl`, pluralização, vocabulário |
| [08 — Dados e domínio](08-dados-e-dominio.md) | O tipo `Viatura`, o inventário, os helpers de filtro |
| [09 — Código e arquitetura](09-codigo-e-arquitetura.md) | Next.js 16, Tailwind v4, nomenclatura, estado dos filtros |

## As dez regras não-negociáveis

O resumo executivo. Cada uma está desenvolvida no documento respetivo.

1. **Tema claro, sempre.** Não há dark mode, não há `dark:`. `color-scheme: light` é fixo. O site nasceu escuro, herdado de outro stand; a mudança e o porquê estão em [02](02-cor-e-materia.md).
2. **O laranja é cor de mancha, não de letra.** Sobre branco dá 2,6:1 como texto e 6,1:1 como fundo com antracite por cima — que é o que o logótipo faz. Para laranja em texto existe o `--laranja-deep`. Áreas grandes de laranja só numa: a `FaixaLona`.
3. **As fotos das viaturas são o elemento dominante.** Tudo o resto é moldura.
4. **As secções têm duas assinaturas, e usam-se sempre as duas.** A estrutural — `01 ───── O STOCK`, numerada, com a régua a desenhar-se ao entrar no ecrã (`TituloSeccao`). E a tipográfica — o heading em Montserrat 600 com a última palavra a 800 em laranja. Uma secção sem as duas destoa imediatamente.
5. **Tudo é redondo.** `rounded-full` em botões, chips, badges e indicadores (31 usos); `rounded-2xl` em cards (10).
6. **Hover: texto vai a `laranja-bright`, bordas vão a `laranja`.** Sem exceções.
7. **O divisor decorativo é `.hairline`, e os cards levantam por sombra.** Nunca `<hr>`. Sombra baixa (`shadow-card`) em cards, sombra alta no que flutua — num fundo claro a borda sozinha não chega para separar.
8. **Glifos de texto em vez de ícones** — `‹ › → ↗ ✕ ▾ ◆ · ⤢ ✓`. Só existem 4 SVGs inline no projeto inteiro.
9. **Conteúdo em PT-PT**, formatado por `Intl` com locale `pt-PT`. Pluralização é manual e obrigatória.
10. **Sem bibliotecas de utilidade de classes.** Não há `clsx`, `cva` nem `tailwind-merge` — composição por template strings.

## Painel de gestão

Existe um painel em `/admin` para o cliente gerir os anúncios sem código. **Não está configurado** neste repositório — sem base de dados, bucket nem chave de email — e o site público não precisa dele para correr. A especificação vive em [`docs/admin/`](../admin/README.md) — arquitetura, infraestrutura, autenticação, segurança e UX. O painel herda os tokens e as fontes daqui, mas não a linguagem editorial.

## Relação com `AGENTS.md`

O [`AGENTS.md`](../../AGENTS.md) na raiz é o ponto de entrada curto: identidade do projeto, stack, skills e a regra do Next.js 16. Todo o detalhe de design e convenções vive aqui.
