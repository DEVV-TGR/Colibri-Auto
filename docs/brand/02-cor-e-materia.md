# 02 — Cor e matéria

> **Aplica-se a** — toda a cor, superfície, borda, gradiente e estado de foco.
> **Fonte de verdade** — `src/app/globals.css` (tokens em `:root`, materiais a partir de `.text-laranja-metal`).
> **Ler antes de** — escrever qualquer classe de cor, criar um card, um overlay ou um badge.

## De onde vem a cor

Do logótipo, e de mais lado nenhum. O selo da Colibri é laranja `#FB7803`
sobre antracite `#1D1D1D` — é a cor que está pintada na lona à porta do stand,
a mesma que aparece no fundo de todas as fotografias do inventário. O site tem
de bater com ela, e é por isso que o `--laranja` é o valor medido do ficheiro e
não uma versão "melhorada".

Tema escuro fixo. Todas as cores em **OKLCH**, definidas em `:root` e expostas
ao Tailwind por `@theme inline`.

## Tokens

### Fundos e linhas

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--background` | `oklch(0.13 0 0)` | Fundo base. Neutro puro, croma 0 | `bg-background` |
| `--surface` | `oklch(0.18 0 0)` | Cards, painéis, footer. Neutro puro | `bg-surface` |
| `--raised` | `oklch(0.21 0.014 50)` | Superfície elevada, ligeiramente quente | `bg-raised` |
| `--line` | `oklch(0.27 0.018 50)` | Bordas e divisores | `border-line` |

Repare na progressão de temperatura: os dois fundos mais escuros são **neutros
puros**; o calor entra só a partir do `--raised`, e entra pelo **hue do laranja
da marca (50)**. Isto é herança corrigida — o sistema de origem punha aqui o
hue do âmbar (85), e a diferença vê-se nas bordas de todos os cards da
listagem.

### Laranjas

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--laranja` | `oklch(0.71 0.187 50)` | Laranja primário: CTA, bordas activas, ícones, indicadores | `text-laranja` `bg-laranja` |
| `--laranja-bright` | `oklch(0.81 0.15 58)` | Hover e realce | `hover:text-laranja-bright` |
| `--laranja-deep` | `oklch(0.52 0.155 42)` | Separadores, glifos, extremos dos gradientes | `text-laranja-deep` |
| `--creme` | `oklch(0.90 0.045 62)` | Texto laranja suave, botões de contorno | `text-creme` |

Os três laranjas são **o mesmo pigmento mais claro e mais escuro**, com o hue a
rodar para o vermelho à medida que escurece (58 → 50 → 42), que é como uma
tinta quente se comporta. Não são reflexos de um metal — ver "Materiais".

Dois limites, os dois estreitos:

- **Subir a croma do `--laranja`** põe-no fora do sRGB. O browser corta-o à
  bruta e a cor deixa de bater com o logótipo, que era o ponto todo.
- **Subir a croma do `--creme`** acima de ~0.05 transforma-o num segundo
  laranja, e a paleta passa a ter duas cores de marca em vez de uma.

### Cores de estado

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--vendido` | `oklch(0.32 0.008 50)` | Fundo do badge "Vendido" | `bg-vendido` |
| `--vendido-linha` | `oklch(0.44 0.012 50)` | Borda do mesmo | `border-vendido-linha` |
| `--sucesso` | `oklch(0.62 0.12 152)` | Disponível, no painel | `bg-sucesso` `text-sucesso` |
| `--sucesso-deep` | `oklch(0.48 0.1 152)` | Bordas e fundos esbatidos | `border-sucesso-deep` |
| `--erro` | `oklch(0.58 0.19 22)` | Erro: fundo a 10% | `bg-erro/10` |
| `--erro-deep` | `oklch(0.44 0.16 22)` | Erro: borda | `border-erro-deep` |
| `--erro-bright` | `oklch(0.72 0.17 22)` | Erro: texto | `text-erro-bright` |

#### Porque é que o "Vendido" não é vermelho

É a decisão de cor mais importante deste rebrand, e a que é mais fácil desfazer
por engano.

O sistema de origem tinha um badge "Vendido" em vermelho metálico, a
`oklch(0.55 0.19 27)`. Funcionava lá porque a cor da marca era ouro — hue 76,
croma 0.09. Aqui a marca é laranja a hue **50** com croma **0.187**: 23° e a
mesma croma de distância do vermelho. A 20px num card de listagem são a mesma
mancha, e o selo que devia dizer "esta já não está à venda" passava a ler-se
como um selo da casa.

O vendido é grafite. O tratamento a sério continua a ser a **dessaturação da
fotografia** (`opacity-60 saturate-50`) e a substituição do preço pela palavra
"Vendido" — o badge só nomeia o que a foto já mostra. O vermelho fica
exclusivamente para **erro**, e foi empurrado para hue 22, o mais longe do
laranja que se consegue ir sem virar magenta.

O verde `--sucesso` (hue 152) não conflitua com nada e mantém-se como estava:
serve o painel, onde uma tabela densa tem de distinguir três estados de
relance. É mais claro e menos saturado que o laranja de propósito — disponível
é o estado de quase todas as viaturas, e se gritasse tanto como a cor da marca
a listagem virava um semáforo.

### Texto

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--ink` | `oklch(0.96 0.012 95)` | Texto principal, branco quente | `text-ink` |
| `--muted` | `oklch(0.7 0.022 95)` | Texto secundário, rótulos, meta | `text-muted` |

## A hierarquia do laranja

A regra que mantém o site coerente. Cada tom tem uma função e não se troca por
outro:

| Tom | Onde entra |
|---|---|
| `laranja` | Fundo de CTA primário, borda activa/focada, link de nav activo, ponto activo do carrossel, `▾` dos selects, `:focus-visible` |
| `laranja-bright` | **Hover de texto**, e só isso |
| `laranja-deep` | Separador `·` entre metadados, bullet `◆` dos extras, extremos dos gradientes, anel do thumb dos sliders |
| `creme` | Texto de botão de contorno, notas informativas discretas |

Corolário prático — os dois estados de hover do projecto:

```
texto  →  hover:text-laranja-bright
borda  →  hover:border-laranja
card   →  hover:border-laranja/50
```

## Materiais

### O laranja em superfície e em texto

Duas utilities, o mesmo degradê de **três paragens**:
`laranja-deep → laranja → laranja-bright`.

**`.laranja-fill`** — diagonal a 140°, mais `filter: brightness(1.08)` no
hover. É o preenchimento de **todos os CTA laranja** — o botão do hero, o
"Fale agora", o "Ligar" do detalhe, o "Ver resultados" dos filtros, a variante
`laranja` do `Botao` — e do badge "Reservado".

Um botão laranja usa este degradê, não cor chapada: `#FB7803` chapado numa
página escura fica com aspecto de rectângulo de aviso. O `bg-laranja` fica
reservado a superfícies pequenas onde um gradiente não se leria — badges,
pontos de paginação, contadores, o trilho dos sliders.

**`.text-laranja-metal`** — o mesmo degradê a 100°, recortado pela forma das
letras com `background-clip: text`. **Um uso em todo o projecto**: a palavra
"procura?" no heading do hero (`Hero.tsx`). Manter assim — a escassez é o que
lhe dá peso.

> **Três paragens, e não cinco.** O sistema de origem tinha cinco, e passava
> pelo creme a meio, porque estava a imitar **folha de ouro** — é assim que um
> metal reflecte. Um laranja é tinta. Cinco reflexos numa palavra fazem-na
> parecer um logótipo de anos 90. Se alguma vez isto voltar a crescer, é sinal
> de que se está a copiar o sistema antigo em vez de usar este.

**`.vendido-fill`** — grafite chapado, com borda e texto esbatido. Sem degradê
nenhum, de propósito: é o oposto do CTA. O laranja avança, isto recua.

### `.hairline` — a assinatura visual

```css
height: 1px;
background: linear-gradient(90deg, transparent, laranja-deep 20%, laranja 50%, laranja-deep 80%, transparent);
```

Uma linha fina laranja que desvanece nas pontas. É o **único divisor
decorativo do projecto** — fecho do hero, o `my-6` no cartão sticky, o `my-8`
na secção sobre, o `mt-12` no rodapé, duas vezes no painel de filtros.

### `.grain`

Ruído SVG (`feTurbulence`, `baseFrequency 0.8`) a `opacity: 0.5` sobre fotos
grandes. Aplica-se como classe no contentor — usa `::after` com
`position: absolute`, portanto o pai tem de ser `relative`. Um único uso, no
hero.

## Superfícies

**A borda por defeito é `border-line/60`.** A `/60` não é decoração: à
opacidade cheia a linha lê-se como um traço; a 60% lê-se como uma sombra. Usar
`border-line` cheio só em controlos de formulário (selects), onde a borda tem
de ser tocável.

**Card canónico:**

```
rounded-2xl border border-line/60 bg-surface
```

Com hover, quando o card é interactivo:

```
transition-colors duration-300 hover:border-laranja/50
```

**Camadas fixas** (header, overlays, setas, pílulas sobre fotos) são
translúcidas com blur:

| Contexto | Classe |
|---|---|
| Header | `bg-background/70 backdrop-blur-xl` |
| Caixa de pesquisa do hero | `bg-background/60 backdrop-blur-xl` |
| Setas e badges sobre foto | `bg-background/60` → `hover:bg-background/85` `backdrop-blur` |
| Scrim do drawer de filtros | `bg-background/50 backdrop-blur-sm` |
| Lightbox | `bg-background/95 backdrop-blur-xl` |

**Sombras — só para o que flutua.** Badges sobre fotos
(`shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)]`), CTA flutuante
(`shadow-lg shadow-black/40`), drawer de filtros (`shadow-2xl shadow-black/60`).
**Cards estáticos não levam sombra** — a separação vem da borda, não da
elevação.

## Gradientes sobre fotos

Sempre a partir de `from-background`, **nunca preto puro** — preto puro sobre
`oklch(0.13 0 0)` cria uma banda visível. Sempre `pointer-events-none`.

```
Hero, véu lateral:   bg-gradient-to-r from-background via-background/70 to-background/20
Hero, véu inferior:  bg-gradient-to-t from-background via-transparent to-background/60
Carrossel, base:     bg-gradient-to-t from-background/90 to-transparent
```

O hero sobrepõe dois véus em direcções diferentes: um assenta o texto à
esquerda, o outro funde a foto no fundo da secção. Faz mais falta aqui do que
fazia no sistema de origem — as fotografias deste stand têm uma lona laranja
enorme atrás do carro, e sem os véus ela competia com o próprio texto do hero.

## Foco

Definido globalmente, uma vez:

```css
:focus-visible { outline: 2px solid var(--laranja); outline-offset: 2px; }
```

Não sobrepor por componente. Se um controlo precisar de foco diferente, o
problema é o controlo.

E a selecção de texto: `::selection` é `background: laranja; color: background`.

## Nunca

- **Escrever cores em hex ou `rgb()`.** Todas as cores vivem em tokens; usar as
  utilities (`bg-laranja`, `text-muted`, `border-line`). A única excepção
  existente é o `rgba()` dentro do valor de sombra dos badges.
- **Usar nenhuma classe de cor por omissão do Tailwind** — `orange-500`,
  `red-400`, `emerald-500`. Um token que não está no `@theme inline` não
  existe; se faltar, acrescenta-se lá.
- **Voltar a pôr o "Vendido" a vermelho.** Ver a secção acima — colide com a
  cor da marca, e o vermelho está reservado a erro.
- **Usar laranja em áreas grandes.** É cor de acção e realce. Um painel laranja
  inteiro quebra o registo imediatamente — e este é o risco maior aqui, porque
  a lona do stand é exactamente isso e a tentação de a imitar é real.
- **Aumentar a croma dos laranjas.** Sai do sRGB, o browser corta, e a cor
  deixa de bater com o logótipo.
- **Alargar os degradês para cinco paragens.** É o sistema antigo a voltar.
- **Pôr sombra em cards estáticos.**
- **Usar preto puro** em gradientes ou fundos; usar `from-background`.
- **Introduzir light mode, classes `dark:` ou media queries de tema.** O tema é
  escuro e fixo.
- **Espalhar `.text-laranja-metal`.** Um uso, em texto grande.
- **Sobrepor `:focus-visible`** por componente.
