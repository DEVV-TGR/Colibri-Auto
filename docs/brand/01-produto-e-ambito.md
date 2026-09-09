# 01 — Produto e âmbito

> **Aplica-se a** — decisões sobre o que construir, e sobretudo sobre o que não construir.
> **Fonte de verdade** — `src/app/` (as rotas que existem), `src/data/viaturas.ts` (o inventário).
> **Ler antes de** — propor funcionalidades novas, alargar páginas ou acrescentar secções.

## O que é

Site de um **stand de automóveis**, a **Colibri Auto**, em Perafita (Matosinhos) — dados reais em `src/data/stand.ts`, viaturas e fotografias reais em `src/data/viaturas.ts` e `public/cars/`.

**Ainda não foi apresentado ao cliente.** Foi construído a partir das fontes públicas deles para levar à reunião um site a funcionar em vez de uma proposta em papel. O que ficou assumido por falta de dados está em [`docs/por-confirmar.md`](../por-confirmar.md), e é curto.

A tensão central do projeto: **qualidade visual de nível profissional, âmbito deliberadamente pequeno**. É uma demo destinada a impressionar numa apresentação, não um produto a escalar. Investir em acabamento; não investir em generalidade.

O código do painel de gestão (`/admin`) vem incluído do repositório de origem, mas **não está configurado** — sem base de dados, sem bucket, sem chave de email. O site público não precisa dele para correr. A especificação vive em [`docs/admin/`](../admin/README.md).

## As três páginas

| Rota | Ficheiro | O que tem |
|---|---|---|
| `/` | `src/app/(site)/page.tsx` | Abertura tipográfica, rail do stock, barra de pesquisa com contagem viva e tira de marcas, e quatro secções numeradas — destaques, o que fazemos, o que vai no preço, onde estamos — mais a chamada final |
| `/viaturas` | `src/app/(site)/viaturas/page.tsx` | Barra de filtros no topo com gaveta de intervalos, chips de filtros activos, grelha de cards a três colunas, "Ordenar por" |
| `/carros/[marca]/[modelo]/[id]` | `src/app/(site)/carros/.../page.tsx` | Fotografia de abertura de largura total com parallax e lightbox, ficha técnica, extras por categoria, cartão-resumo sticky, sugestões |

Mais `src/app/not-found.tsx` e `src/app/(site)/viaturas/loading.tsx`.

Além destas, as páginas de serviço (`/contactos`, `/compramos`, `/importamos`) e as legais (`/termos`, `/privacidade`).

A home é a que define a identidade e a de detalhe é a que fecha a venda. A
sequência da home — **abertura → montra → pesquisa** — é deliberada: diz-se a
frase, mostra-se o que há, e só depois se oferece uma forma de filtrar. O
sistema de origem punha a pesquisa dentro do hero, a pedir marca e combustível
a quem ainda não tinha visto uma única viatura.

A página de detalhe é a **mais trabalhada das três** — é onde a demo se prova. Tem rotas estáticas geradas em build (`generateStaticParams`) e metadata dinâmica por viatura (`generateMetadata`, com Open Graph e a primeira foto).

## Inspirações

- **[pintoesousa.com/viaturas/usadas](https://www.pintoesousa.com/viaturas/usadas)** — referência para o registo visual premium e para a listagem/pesquisa.
- **[niceportocar.pt](https://www.niceportocar.pt)** — referência para a estrutura da homepage.

Ambos correm na mesma plataforma white-label, pelo que partilham funcionalidades. **A regra é replicar as funcionalidades, não o layout.** Aqueles sites são Bootstrap genérico; este tem identidade própria e existe precisamente para elevar o nível.

Funcionalidades que definem a categoria e que o projeto implementa:

- Pesquisa rápida no hero (Marca, Modelo, Combustível) com **contagem de resultados em tempo real** no botão.
- Pesquisa detalhada: intervalos de Preço, Ano e Quilómetros por slider duplo; dropdowns de Transmissão, Combustível e Segmento; "Limpar Parâmetros".
- Cards com carrossel de fotos, badges de estado e a linha de meta `Mês/Ano · Combustível · Km`.
- Grelha de marcas cujos logótipos filtram a listagem.

## Fora de âmbito

Omitir, ou deixar como navegação decorativa sem destino real:

- Motos, notícias, galeria institucional
- Intermediação de crédito e simuladores de financiamento
- Multi-stand
- Comparador de viaturas
- Geração real de PDF (o botão "Imprimir" chama `window.print()`, e é suficiente)

Se uma destas aparecer num pedido, confirmar antes de construir — muito provavelmente é âmbito a mais para uma demo.

## O que entretanto entrou no âmbito

Este documento chamou-se durante meses "sem backend, sem base de dados, sem autenticação". Deixou de ser verdade por pedido do cliente, e o que ficou é uma regra mais útil do que a anterior:

- **O painel de gestão** (`/admin`) — entrada por código, viaturas na base, fotografias no R2. Ver [`docs/admin/`](../admin/).
- **Os dois formulários públicos** — `/compramos` e `/importamos`, que enviam um pedido por email com fotografias em anexo. Não gravam nada.

**A regra que substitui a antiga: o site público responde sem variáveis de ambiente.** Sem base de dados serve o inventário estático; sem chave de email o formulário diz o que se passa e encaminha para o WhatsApp. O CI compila, arranca e verifica o site sem uma única variável definida, e é isso que impede uma avaria no painel de levar a montra atrás.

## Estado atual do inventário

Sete viaturas, cinco marcas. Números concretos em [08 — Dados e domínio](08-dados-e-dominio.md).

Três notas com efeito visível na UI:

- **O Mercedes-Benz B 150 (`v-0007`) está `vendido`** — e está mesmo: a publicação do Instagram diz "VENDIDO ✅". O badge grafite e a dessaturação da fotografia estão activos e visíveis, não são código morto.
- **O Renault Kangoo (`v-0003`) está `reservado` e tem `ivaDedutivel: true`.** É o único card do site com dois badges empilhados. No sistema de origem nenhum destes dois estados chegou a renderizar com dados reais.
- **Uma viatura tem 19 fotografias e as outras seis têm uma.** É o desequilíbrio mais visível do site, e é de dados, não de código — ver [`docs/por-confirmar.md`](../por-confirmar.md).

## Nunca

- Configurar base de dados, bucket ou email sem o cliente pedir. O site público responde sem variáveis de ambiente, e é essa regra que o mantém de pé.
- Construir funcionalidades da lista "fora de âmbito" sem confirmar primeiro.
- Copiar o layout dos sites de inspiração; replicar a funcionalidade, elevar a execução.
- Alargar o inventário sem preencher a ficha técnica **completa** da viatura nova — todos os 30 campos de `Viatura` são obrigatórios.
- **Inventar matrículas, VIN ou qualquer outro dado que não se saiba.** O que não é público fica a `SEM_DADOS`. Este site vai ser mostrado a quem conhece as viaturas de cor.
