# 05 — Componentes

> **Aplica-se a** — todos os componentes de interface e os padrões repetidos entre eles.
> **Fonte de verdade** — `src/components/` (`ui/`, `car/`, `catalogo/`, `home/`, `layout/`).
> **Ler antes de** — criar um componente novo ou estilizar um controlo.

## Componentes base — `src/components/ui/`

### `Botao` / `BotaoLink`

O único componente com sistema de variantes. Exporta dois com a mesma aparência: `BotaoLink` (envolve `next/link`) e `Botao` (`<button>`).

```ts
type Variante = "laranja" | "contorno" | "fantasma";
```

Base partilhada:
```
press inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide
cursor-pointer select-none
```

| Variante | Classes | Uso |
|---|---|---|
| `laranja` (default) | `laranja-fill text-background font-medium` | Ação primária |
| `contorno` | `border border-laranja/40 text-creme hover:border-laranja hover:text-laranja-bright` | Ação secundária |
| `fantasma` | `text-muted hover:text-laranja-bright` | Ação terciária |

A `.press` trata da transição toda — cor, brilho e escala ao premir. Por isso a base **não** leva `transition-colors`: seriam duas declarações a colidir. Ver [06 — Movimento](06-movimento.md).

Assinatura: `ComponentProps<typeof Link> & { variante?: Variante; children: ReactNode }`. O `className` é concatenado por template string.

**Não há tamanhos** — um só (`px-6 py-3 text-sm`). Quando é preciso outro padding, passa-se por `className`.

### `Reveal`

Envolve conteúdo numa entrada em scroll. `{ children, delay?: number = 0, className? }`. Detalhes dos valores em [06 — Movimento](06-movimento.md).

### `Contador`

`{ valor: number }`. Número que anima ao mudar — usado nas contagens de resultados. Escreve direto em `textContent`, sem re-render do React.

### `LogoAnel`

Logótipo com anel laranja a girar; base dos ecrãs de carregamento.

```ts
{ tamanho?: "grande" | "pequeno" = "grande"; prioridade?: boolean = false }
const TAMANHOS = { grande: { caixa: 280, logo: 196 }, pequeno: { caixa: 132, logo: 92 } }
```

SVG `viewBox="0 0 100 100"`, dois círculos `r=46` com `strokeWidth=1.25`: um completo em `var(--line)`, outro em `var(--laranja)` com `strokeDasharray="72 217"` — o arco laranja é ~25% da circunferência (2πr ≈ 289).

### `Preloader`

Ecrã de abertura. `MINIMO_MS = 1100`, `LIMITE_MS = 3000`, `LARGURA_PX = 200`, `ZOOM = 1.5`.

Fixa em `z-[100]` sobre `bg-background` opaco, trava o scroll do body, e **sai por corte seco**. O comentário no ficheiro explica: *"o preto nunca se desvanece, para a homepage não chegar a aparecer por baixo do logo"*. A saída é comandada por temporizador, não pelo fim da animação.

### `TransicaoRota`

Ecrã breve entre páginas. `MINIMO_MS = 600`, `LIMITE_MS = 3000`. Escuta o evento `"rota:inicio"` disparado por `src/instrumentation-client.ts` — ver [09](09-codigo-e-arquitetura.md). Ignora navegações para a mesma página (âncoras). Também sem fade, pela mesma razão.

## Padrões transversais

### Card canónico

```
rounded-2xl border border-line/60 bg-surface
```
Interativo, acrescenta: `transition-colors duration-300 hover:border-laranja/50`.

10 usos de `rounded-2xl`: CarCard, StickyCard, sidebar e modal de filtros, empty state, mapa, cards de marca (estes com `bg-background`), galeria.

### Badges de estado — `car/BadgeEstado.tsx`

Contentor `pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5`, empilhado.

Base comum: `rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.15em]`.

| Estado | Tratamento | Semântica |
|---|---|---|
| **Vendido** | `.vendido-fill` + `font-medium` + sombra | Grafite chapado — recua, ao contrário do laranja. Ver [02](02-cor-e-materia.md#porque-é-que-o-vendido-não-é-vermelho) |
| **Reservado** | `.laranja-fill` + `text-background` + `font-medium` + sombra | Ouro sólido — atenção, ainda há hipótese |
| **IVA Dedutível** | `border border-laranja/50 bg-background/70 text-creme backdrop-blur` | Contorno — informativo, não é estado |

A sombra dos dois primeiros é `shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)]` — assentam sobre a foto e precisam de a descolar.

Nenhuma viatura está `reservado` nem tem IVA dedutível hoje; o MINI está `vendido`. Ver [01](01-produto-e-ambito.md).

### Estado "vendido" — dessaturar, não esconder

Foto a `opacity-60 saturate-50` (`opacity-70 saturate-50` no carrossel), e o preço substituído pela palavra "Vendido" em três sítios: `CarCard`, `StickyCard`, `DestaquesCarrossel`. A viatura continua navegável.

### Select estilizado

O `<select>` nativo é estilizado à mão em três sítios (`BarraPesquisa`, `SelectField`, `SortSelect`). A receita:

```tsx
<span className="relative block">
  <select className="w-full appearance-none rounded-xl border border-line bg-surface/80
                     px-4 py-3 pr-10 text-sm text-ink outline-none transition-colors
                     focus:border-laranja [&>option]:bg-surface">
    …
  </select>
  <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-laranja">▾</span>
</span>
```

Três detalhes que não se podem perder: `appearance-none` mata a seta nativa; `[&>option]:bg-surface` corrige o dropdown branco no Windows/Firefox; o `▾` é `pointer-events-none` para não bloquear o clique.

`SelectField` usa `rounded-xl` (campo de formulário); `SortSelect` usa `rounded-full` (controlo inline).

### Campos de formulário — `src/components/ui/campos.tsx`

Os formulários públicos (`/compramos`, `/importamos`) usam estas primitivas: `Campo`, `CampoNumero`, `CampoSelecao`, `CampoArea`, `CampoEscolha`, `CampoConsentimento`, `Aviso`, `Sucesso`. As receitas:

```
input/textarea  w-full rounded-xl border bg-background px-4 py-3 text-sm text-ink
                outline-none transition-colors placeholder:text-muted/60
                disabled:opacity-60
  linha calma   border-line focus:border-laranja
  linha errada  border-erro-deep focus:border-red
label           mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted
erro do campo   mt-1.5 block text-xs leading-relaxed text-erro-bright
select          o mesmo + appearance-none bg-surface/80 pr-10 [&>option]:bg-surface
                com o `▾` laranja por cima (ver a receita acima)
```

A cor da linha está **fora** do `inputBase` de propósito: duas utilitárias de
`border-color` na mesma classe deixam a que ganha ao acaso da ordem em que o
Tailwind as escreve na folha.

**Público redondo, painel quadrado.** O `ViaturaForm` usa `inputBase` sem `rounded` porque é uma ferramenta de trabalho, preenchida todos os dias, onde a densidade vale mais; estes campos são para quem preenche um formulário uma vez na vida, e seguem o `rounded-xl` do resto do site. A divergência é deliberada — não é dívida.

Três regras que não se podem perder:

- **Os campos são controlados.** Depois de uma server action o React 19 faz reset ao `<form>`; sem valor em estado, um erro de validação apaga o que a pessoa escreveu. Ver `FormularioPedido.tsx`. Pela mesma razão, **nada que precise de sobreviver ao envio pode viver num `<input>` escrito à mão** — foi o que aconteceu ao relógio anti-robô, que passou a viver numa referência.
- **Cada bloco é um `<fieldset>` com `<legend>`** na assinatura da casa (última palavra em `font-extrabold text-laranja`). Um grupo de campos sem `fieldset` é um grupo que um leitor de ecrã não anuncia.
- **Opcional escreve-se, obrigatório não.** O rótulo leva `(opcional)` quando o campo o é; o asterisco é convenção de formulário de repartição, não de sítio premium.

**Quando o erro aparece.** Um campo recebe `erro` e `aoSair`; quem decide é o `FormularioPedido`, que corre o mesmo schema zod do servidor a cada tecla. A regra:

| Momento | O que acontece |
|---|---|
| A escrever pela primeira vez | Nada. Ninguém quer ler "indique o seu nome" à primeira letra. |
| Ao sair do campo | A frase aparece, a linha fica `border-erro-deep`, e a nota do campo dá o lugar ao erro. |
| A corrigir | Desaparece assim que o valor serve, sem esperar por sair outra vez. |
| Ao carregar em «Enviar» | Todos os campos passam a visitados de uma vez, e o ecrã salta ao primeiro por corrigir — `focus({preventScroll:true})` + `scrollIntoView({behavior:"instant"})`. |

Os campos de escolha — `select`, pílulas de rádio — avisam **ao mudar** e não ao sair: escolher já é uma decisão terminada.

Duas armadilhas que custaram a encontrar e não se devem repetir:

- **Travar um envio incompleto faz-se no `onSubmit`, com `preventDefault`** — nunca desistindo a meio da action. Uma action que corre e desiste continua a ser uma action corrida, e o React faz reset ao `<form>` logo a seguir: os campos ficam visualmente vazios, com o estado ainda cheio, até haver um novo render que os reponha. Quem preencheu dezasseis campos vê o formulário esvaziar-se por ter falhado um.
- **O salto para o campo errado é instantâneo, ao contrário do resto do site.** As frases de erro aparecem acima da vista, o browser reajusta a posição sozinho para compensar, e esse reajuste cancela uma rolagem suave a meio — a pessoa fica onde estava, a olhar para um botão que aparentemente não fez nada.

O `<form>` leva `noValidate`. As bolhas nativas do browser chegam antes das nossas, dizem o mesmo noutra língua e não seguem a folha de estilos.

Quantidade e estado: `Aviso` é `role="alert"`, `Sucesso` é `role="status"`, e os dois recebem foco depois do envio — sem isso, quem usa leitor de ecrã submete e fica no botão sem saber o que aconteceu.

### Glifos em vez de ícones

O projeto usa caracteres de texto para quase toda a iconografia:

| Glifo | Uso |
|---|---|
| `‹` `›` | Navegação de fotos (card, carrossel, lightbox); `›` também abre o `<details>` da ficha, com `group-open:rotate-90` |
| `→` | Cards de marca, link «Ver todas» dos destaques |
| `↗` | Links externos (Instagram, mapa) |
| `✕` | Fechar overlays, remover chip de filtro |
| `▾` | Seta dos selects |
| `◆` | Bullet dos extras, em `text-laranja-deep` |
| `·` | Separador de metadados, em `text-laranja-deep` |
| `⤢` | Expandir galeria |
| `✓` | Confirmação ("Ligação copiada ✓") |

Só existem **4 SVGs inline** em todo o projeto: `IconeFiltros` (`CatalogoClient.tsx`, 16×16) e três ícones de meta no carrossel (`DestaquesCarrossel.tsx`, 15×15). Todos com `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth` 1.6–1.7, `strokeLinecap="round"`, `aria-hidden`.

Antes de acrescentar um ícone: verificar se há glifo que sirva.

### Controlos que só aparecem no hover

Setas do card de viatura:
```
lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100
```

Escondidos só em `lg:` (em touch estão sempre visíveis) e **sempre com escape por `focus-visible`** — sem ele ficam inalcançáveis por teclado.

### Imagens

Todas as fotos de viatura: `next/image` com `fill`, `sizes` explícito e `object-cover`. Exemplo do card:

```tsx
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
priority={prioridade && foto === inicial}
```

`priority` é seletivo — só as primeiras da grelha (`i < 2`) e as cópias visíveis do carrossel. Zoom no hover: `group-hover:scale-[1.03]` no card, `scale-[1.02]` na galeria, sempre com `duration-500`.

Exceção documentada: os logótipos de marca usam `<img>` com `eslint-disable-next-line` e justificação inline em `BarraPesquisa.tsx`.

Detalhe de composição no `CarCard`: o **preço não é texto por baixo da foto, é uma etiqueta `.laranja-fill` sobre ela**, no canto superior direito. Não é escolha de layout — é o idioma que a Colibri já usa em todas as publicações do Instagram, e reconhecê-lo é metade do que faz o site parecer deles. A abertura da ficha repete-a à sua escala, para quem clicou num card a encontrar onde a deixou. Uma viatura vendida não leva etiqueta nenhuma: o preço deixou de ser uma proposta.

### Acessibilidade

O checklist que o projeto cumpre, e que código novo deve cumprir:

- `aria-label` em todos os botões-ícone (26 usos)
- `aria-live="polite"` nas contagens de resultados e nos ecrãs de carregamento
- `role="dialog"` + `aria-modal` no lightbox e no drawer de filtros
- `aria-labelledby` nas secções com heading (`<section aria-labelledby="ficha-tecnica">`)
- `<fieldset>` / `<legend>` nos sliders de intervalo
- `sr-only` a descrever ecrãs de carregamento ("A carregar")
- `aria-hidden` + `tabIndex={-1}` no CTA flutuante quando escondido
- `aria-hidden` em todos os glifos decorativos
- Lightbox: `Escape`, `ArrowLeft`, `ArrowRight`; bloqueia scroll do body

## Os componentes de estrutura

Quatro peças que não existiam no sistema de origem e que são o que dá ao site a
sua própria gramática.

### `TituloSeccao` — a assinatura

```
01 ─────────────────────────  O STOCK
Está tudo aqui.
Sete viaturas. Não há catálogo escondido.
```

Substitui o *eyebrow* em maiúsculas espaçadas que marcava as secções. O número
em `font-mono` laranja, a régua a desenhar-se da esquerda para a direita ao
entrar no ecrã, o rótulo ao fundo, e por baixo o heading com a assinatura
tipográfica de sempre.

Os números são **escritos à mão** e não derivados da ordem no ficheiro. As
secções mudam de sítio; o número tem de continuar a ser o mesmo sítio na
conversa entre quem trabalha no site.

A régua anima `scaleX` com `origin-left`, e não a largura. Transformar não
obriga o browser a recalcular a disposição da página a cada fotograma; uma
largura obriga.

### `MontraFundo` — o stock a atravessar o ecrã

Duas filas com a capa de cada viatura, em **sentidos opostos** e a velocidades
diferentes (50s e 68s), logo por baixo do título da abertura.

As duas filas não são decoração duplicada. Uma só lê-se como uma tira a passar;
duas em sentidos contrários lêem-se como **profundidade**, com a mais rápida a
parecer mais perto. Se as durações forem iguais, o efeito desaparece e ficam
duas tiras.

A segunda fila arranca a meio da lista. Com as duas a começarem na mesma
viatura e a andarem em sentidos opostos, havia um instante em que as mesmas
fotografias ficavam alinhadas na vertical — e via-se que era a mesma lista duas
vezes.

**É cenário, não é o carrossel dos destaques**, e a distinção é o que os impede
de se lerem como o mesmo elemento feito duas vezes:

| | `MontraFundo` | `DestaquesCarrossel` |
|---|---|---|
| O que é | Cenário. A montra a passar | Componente de produto |
| Conteúdo | Fotografia e nome | Foto, preço, meta, versão, ligação |
| Escala | Tiras baixas, cortadas nas margens | Cards grandes, dentro do container |
| Controlo | Nenhum | Setas, pontos, arrasto |

Se alguma vez a montra ganhar um preço ou uma seta, passa a ser um segundo
carrossel — e aí um dos dois está a mais.

### `FaixaLona` — a lona à largura do ecrã

Banda laranja de margem a margem com `COMPRA · VENDA · RETOMA · GARANTIA
INCLUÍDA` a passar em maiúsculas pesadas antracite. É literalmente a lona
pendurada à porta do stand.

**Quebra a regra 2 do sistema de propósito** — «o laranja nunca preenche áreas
grandes». A regra existe para impedir que o laranja se torne fundo por
preguiça, e continua a valer em todo o lado menos aqui, onde a área laranja
**é** a identidade. Uma banda, e só uma: a segunda deixa de ser identidade e
passa a ser um tema laranja. Se aparecer o pedido de uma segunda, a resposta é
mudar esta de sítio.

### A emenda dos dois marquees

A técnica é a mesma nos dois: a fila é o conteúdo **duplicado**, e o
deslocamento é de exactamente uma cópia. Quando a primeira acaba de sair, a
segunda está no sítio onde a primeira começou.

Na montra é `calc(-50% - goteira/2)` e não `-50%`, porque entre as cópias há
uma goteira; sem a correcção dá um solavanco de 8px a cada volta. A faixa não
precisa dela — as passagens estão encostadas.

A segunda cópia leva sempre `aria-hidden`: para um leitor de ecrã é o mesmo
conteúdo, e anunciá-lo duas vezes seria mentira.

### `FiltrosBarra` — os filtros no topo

A coluna lateral de 280px saiu. Faz sentido com centenas de anúncios, onde
filtrar é o trabalho da página; com sete viaturas comia um quarto da largura
para oferecer escolhas que quase não reduzem nada, e prendia a grelha a duas
colunas quando cabiam três.

Cinco selects numa linha, e os intervalos — preço, ano, quilómetros — numa
gaveta que só abre a pedido. **A gaveta abre sozinha se o endereço já trouxer um
intervalo**: sem isso, quem chegasse por um link com `?precoMax=9000` via a
listagem filtrada e o controlo que a filtrou escondido.

Só desktop. Em telemóvel continua a valer o painel em modal do
`CatalogoClient`, que uma barra horizontal não substitui.

### `AberturaViatura` — a ficha começa pela fotografia

Fotografia de largura total com parallax, percurso a flutuar no topo, título e
etiqueta de preço por cima. A tira de miniaturas encosta-se por baixo e abre o
`Lightbox`, que se aproveitou sem alterações.

O tecto de altura é `clamp(320px, 56svh, 560px)`, e é uma medida e não um
gosto: seis das sete viaturas têm uma fotografia só, e três dessas foram
recortadas do Instagram a 630px de largura. A `100svh` o upscale via-se. **Quando
o cliente der as originais, este tecto pode subir; até lá, não.**

Com uma fotografia só não há tira de miniaturas — uma miniatura sozinha do que
já está em cima é ruído a fingir de galeria.

## Dívida conhecida

Divergências reais entre o padrão e o código. Documentadas, não corrigidas — corrigir só com pedido explícito.

1. **O botão "contorno" está replicado à mão** fora do `Botao.tsx`: no `Header`, no `StickyCard`, no `CatalogoClient` e no `DadosContacto`. A string de classes é a mesma, mas os paddings divergem (`px-5 py-2`, `px-5 py-2.5`, `px-6 py-3`, `px-6 py-3.5`). É a maior divergência entre o componente e o uso real.
2. **`BarraPesquisa` duplica o `SelectField`** — tem um componente `Campo` local com a mesma receita, em vez de importar. Herdado do `HeroSearch`, que substituiu.
3. **O badge "Reservado" tem dois tratamentos.** `BadgeEstado` usa `.laranja-fill`; o `StickyCard` usa `bg-laranja` chapado.
4. **O carrossel tem um `Badge` próprio** (`DestaquesCarrossel.tsx:54`) que reimplementa o `BadgeEstado` com pequenas divergências: `font-bold` e `tracking-[0.14em]` (contra `font-medium` e `tracking-[0.15em]`), `border-laranja/60` (contra `/50`), sem sombra, e mostra **apenas um** badge por prioridade em vez de empilhar. A semântica de cor é a mesma.

## Nunca

- **Criar um card sem a receita canónica** (`rounded-2xl border border-line/60 bg-surface`).
- **Acrescentar um ícone SVG** sem verificar primeiro se há glifo que sirva.
- **Esconder um controlo no hover sem `focus-visible:opacity-100`.**
- **Usar `next/image` sem `sizes`** em fotos de viatura, ou pôr `priority` em tudo.
- **Estilizar um `<select>`** sem `[&>option]:bg-surface` e sem `pointer-events-none` na seta.
- **Introduzir uma quarta variante de botão.** Três chegam.
- **Deixar um botão-ícone sem `aria-label`** ou um glifo decorativo sem `aria-hidden`.
