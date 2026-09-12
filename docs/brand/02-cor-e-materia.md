# 02 — Cor e matéria

> **Aplica-se a** — toda a cor, superfície, borda, gradiente e estado de foco.
> **Fonte de verdade** — `src/app/globals.css` (tokens em `:root`, materiais a partir de `.laranja-fill`).
> **Ler antes de** — escrever qualquer classe de cor, criar um card, um overlay ou um badge.

## De onde vem a cor

Do logótipo, e de mais lado nenhum. O selo da Colibri é laranja `#FB7803` e
antracite `#1D1D1D`, **sobre branco** — a mesma cor que está pintada na lona à
porta do stand e que aparece no fundo de todas as fotografias do inventário. O
site tem de bater com ela, e é por isso que o `--laranja` é o valor medido do
ficheiro e não uma versão "melhorada".

**Tema claro fixo.** O site nasceu escuro, herdado do Império Auto Concept, que
vendia Porsches e Jaguars — num stand assim o preto é o argumento. Aqui
trabalhava contra o único material bom que há: o logótipo está sobre branco, a
lona está ao sol, e as fotografias todas são de dia, com relva verde e carros
brancos. Num fundo preto ficavam baças, e o site parecia — palavras do
cliente — «escuro e morto».

Todas as cores em **OKLCH**, definidas em `:root` e expostas ao Tailwind por
`@theme inline`. Os pares que interessam são verificados por
`npm run check:contraste`, que lê os valores deste ficheiro.

## Tokens

### Fundos e linhas

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--background` | `oklch(0.97 0.006 65)` | Papel. Off-white morno, **não branco puro** | `bg-background` |
| `--surface` | `oklch(1 0 0)` | Cards e painéis — brancos, para levantarem do papel | `bg-surface` |
| `--raised` | `oklch(0.945 0.010 62)` | Bandas alternadas, dão ritmo à página | `bg-raised` |
| `--areia` | `oklch(0.955 0.035 68)` | Lavagem laranja pálida | `bg-areia` |
| `--line` | `oklch(0.89 0.012 60)` | Bordas e divisores | `border-line` |
| `--escuro` | `oklch(0.235 0.006 60)` | O antracite do logótipo, agora **fundo**: rodapé | `.faixa-escura` |
| `--escuro-muted` | `oklch(0.72 0.012 60)` | Texto secundário **dentro** de uma faixa escura | `text-escuro-muted` |

A inversão de papéis é o ponto. No tema escuro os cards eram mais claros que o
fundo e separavam-se por borda; aqui são brancos sobre papel e separam-se por
**luz**, com `shadow-card`.

É por isso que o `--background` não é branco puro. Sem o papel morno por baixo,
um card branco sobre branco não existe e a página fica uma folha em branco com
texto lá dentro. Os 0.006 de croma a hue 65 não se leem como cor — leem-se como
a diferença entre o card e o chão.

O `--escuro-muted` existe porque o `--muted` foi calibrado para o papel: dentro
do rodapé dá 2,8:1 e não passa. Usar o token errado ali é o engano mais fácil
de cometer neste sistema, e `npm run check:contraste` apanha-o.

### Laranjas

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--laranja` | `oklch(0.71 0.187 50)` | O `#FB7803` do logótipo. **Superfície**, nunca texto | `bg-laranja` `.laranja-fill` |
| `--laranja-bright` | `oklch(0.78 0.16 55)` | Fim do degradê e hover de superfície | — |
| `--laranja-deep` | `oklch(0.55 0.17 45)` | **Texto**, links, ícones, o `01` das secções | `text-laranja-deep` |

### A inversão que governa o tema claro

Sobre branco, o `--laranja` a `L 0.71` dá **2,6:1** para texto e não passa.
Como fundo, com antracite por cima, dá **6,1:1** e passa com folga.

Ou seja: **o laranja é cor de mancha e não cor de letra**, e o texto por cima
dele é `--ink` — declarado na própria `.laranja-fill`, para não depender de
cada sítio se lembrar. Não é um compromisso de acessibilidade: é exactamente o
que o logótipo faz, com «Colibri Auto» escrito a antracite dentro do selo
laranja. O sistema passou a fazer o que a marca já fazia.

Para laranja em texto existe o `--laranja-deep`, a `L 0.55`, que dá 4,8:1 sobre
o papel. **Não existe `text-laranja`** — se aparecer, é código copiado do tema
escuro.

Dois limites, os dois estreitos:

- **Subir a croma do `--laranja`** põe-no fora do sRGB. O browser corta-o à
  bruta e a cor deixa de bater com o logótipo, que era o ponto todo.
- **Subir a claridade do `--laranja-deep`** acima de ~0.57 fá-lo cair abaixo de
  4,5:1 sobre o papel, e o `check:contraste` falha.

### Cores de estado

| Token | Valor | Papel | Utility |
|---|---|---|---|
| `--vendido` | `oklch(0.925 0.006 60)` | Fundo do badge "Vendido" | `bg-vendido` |
| `--vendido-linha` | `oklch(0.80 0.008 60)` | Borda do mesmo | `border-vendido-linha` |
| `--sucesso` | `oklch(0.45 0.13 152)` | Disponível, no painel | `bg-sucesso` `text-sucesso` |
| `--sucesso-deep` | `oklch(0.38 0.11 152)` | Bordas e fundos esbatidos | `border-sucesso-deep` |
| `--erro` | `oklch(0.50 0.20 25)` | Erro: texto e fundo a 10% | `bg-erro/10` |
| `--erro-deep` | `oklch(0.42 0.17 25)` | Erro: borda | `border-erro-deep` |
| `--erro-bright` | `oklch(0.50 0.20 25)` | Erro: texto | `text-erro-bright` |

Os estados foram **escurecidos** na passagem a claro. Os valores do tema escuro
eram claros de propósito, para brilharem sobre preto; sobre papel ficavam
ilegíveis. O `--vendido` foi ao contrário — subiu de `L 0.90` para `L 0.925`
porque o `check:contraste` o apanhou a 4,46:1 contra o texto esbatido, quatro
centésimas abaixo do mínimo. Foi a primeira coisa que o script encontrou.

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
| `--ink` | `oklch(0.235 0.006 60)` | Texto principal. É o antracite do logótipo | `text-ink` |
| `--muted` | `oklch(0.50 0.014 60)` | Texto secundário, rótulos, meta | `text-muted` |

O `--muted` a `L 0.50` não é um valor bonito, é o **limite**: a 0.52 cai para
4,3:1 sobre o papel e deixa de passar. Não subir sem correr o
`check:contraste`.

## A hierarquia do laranja

A regra que mantém o site coerente. Cada tom tem uma função e não se troca por
outro:

| Tom | Onde entra |
|---|---|
| `laranja` | **Superfícies**: CTA, etiquetas de preço, badge "Reservado", ponto activo do carrossel, borda activa/focada, `:focus-visible`. Todas pequenas. Nunca texto |
| `laranja-bright` | Fim do degradê da `.laranja-fill` e o seu hover |
| `laranja-deep` | **Tudo o que é laranja em texto**: links, o `01` das secções, eyebrows, separador `·`, bullet `◆`, `▾` dos selects |

Corolário prático — os três estados de hover do projecto:

```
texto  →  hover:text-laranja-deep
borda  →  hover:border-laranja
área   →  hover:bg-laranja/10        (botão de contorno)
```

O terceiro é novo do tema claro. Sobre preto, mudar a cor da letra no hover
lia-se de imediato; sobre papel, acender a área lê-se melhor do que mudar o tom
de uma palavra.

## Materiais

### As duas superfícies escuras

O tema é claro e fixo (regra 1), e isso continua a valer: não há `dark:`, não há tema alternável. **Uma secção escura não é dark mode** — o site tem duas, e são deliberadas:

| Superfície | O quê |
|---|---|
| Rodapé | `bg-escuro` chapado |
| Abertura da home | fotografia de ecrã inteiro com a classe `.veu-abertura` por cima |

O texto sobre elas **não** usa os mesmos tokens, e a diferença tem uma razão medida:

- **Sobre o rodapé**, que é uma cor chapada, vale o par do sistema: `--background` para o texto forte e `--escuro-muted` para o secundário (6,71:1).
- **Sobre a abertura**, que é uma fotografia, o `--escuro-muted` **não passa**. O pixel mais claro por baixo da coluna de texto é branco puro — a janela de luz do render — e contra ele aquele cinzento dá 3,47:1 por mais que se carregue no véu. O secundário ali é `--background` esbatido a 80%, que dá 5,71:1 no mesmo sítio.

A força do véu vive num só sítio, `--veu-abertura` em `globals.css`, e o valor (0,78) é medido e não escolhido: abaixo de 0,74 o laranja do título deixa de passar os 3:1 de texto grande.

**A regra que daqui sai:** um token de contraste é válido contra o fundo para que foi medido. Sobre fotografia, medir outra vez.

### O laranja em superfície e em texto

Duas utilities, o mesmo degradê de **três paragens**:
`laranja-deep → laranja → laranja-bright`.

**`.laranja-fill`** — diagonal a 140°, mais `filter: brightness(1.08)` no
hover. É o preenchimento de **todos os CTA laranja** — o "Ver o stock" da
abertura, o "Fale agora", o "Ligar" da ficha, o "Ver resultados" dos filtros, a
variante `laranja` do `Botao` — do badge "Reservado", e das **etiquetas de
preço** sobre as fotografias.

Um botão laranja usa este degradê, não cor chapada: `#FB7803` chapado numa
página escura fica com aspecto de rectângulo de aviso. O `bg-laranja` fica
reservado a superfícies pequenas onde um gradiente não se leria — badges,
pontos de paginação, contadores, o trilho dos sliders.

**`.text-laranja-metal` foi removido.** Era o mesmo degradê a 100°, recortado
pela forma das letras com `background-clip: text`, e tinha um único uso: a
linha «sem letra pequena.» na abertura da home. Saiu quando a abertura foi
refeita, e a classe saiu do `globals.css` com ele — um degradê em texto é
decoração sem significado, e o laranja chapado (`--laranja-deep`) diz o mesmo
com 5,20:1 de contraste sobre branco. Não voltar a introduzir.

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
decorativo do projecto**, e tem dois comprimentos:

- **A régua da secção**, dentro do `TituloSeccao`, que se desenha da esquerda
  para a direita ao entrar no ecrã. Não usa esta classe — usa o mesmo gradiente
  com `origin-left` e `scaleX`, porque tem de animar.
- **O traço curto** (`w-10`, `w-16`, `w-20`), a marcar o início de um cartão ou
  de uma subsecção da ficha.
- **O divisor a toda a largura** (`my-6`, `my-7`, `mt-12`), no cartão sticky, no
  cartão de contactos e no rodapé.

> **`.grain` e `.kenburns` saíram do sistema.** Existiam as duas para a
> fotografia em ecrã inteiro do hero antigo — ruído por cima e zoom lento. A
> abertura da home passou a ser tipográfica e ficaram sem um único uso; CSS
> morto num ficheiro de tokens é pior do que noutro sítio qualquer, porque é
> onde alguém vai procurar o que o sistema oferece.

## Superfícies

**A borda por defeito é `border-line/60`.** A `/60` não é decoração: à
opacidade cheia a linha lê-se como um traço; a 60% lê-se como uma sombra. Usar
`border-line` cheio só em controlos de formulário (selects), onde a borda tem
de ser tocável.

**Card canónico:**

```
rounded-2xl border border-line/60 bg-surface shadow-card
```

O `shadow-card` é o que mudou com o tema. Num fundo escuro, um card mais claro
que o chão separa-se sozinho e a borda chegava; num fundo claro, um card branco
sobre papel precisa de luz por baixo para existir.

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

**Sombras — dois níveis, e ambos são tokens.**

| Token | Utility | Onde |
|---|---|---|
| `--sombra-card` | `shadow-card` | Cards, a barra de filtros, o cartão sticky, os CTA laranja |
| `--sombra-alta` | `shadow-alta` | O que flutua sobre outro conteúdo: cartão de contactos sobre o mapa, drawer de filtros |

A regra do tema escuro era «cards estáticos não levam sombra». Deixou de valer:
aqui a sombra baixa **é** o que separa o card do chão. O que se mantém é a
proporção — quem flutua leva mais sombra do que quem assenta.

## Gradientes sobre fotos

Sempre a partir de `from-background`, **nunca branco puro** — branco puro sobre
o papel morno cria uma banda visível. Sempre `pointer-events-none`.

```
Ficha, véu inferior:  h-2/3  bg-gradient-to-t from-background via-background/70 to-transparent
Ficha, véu superior:  h-32   bg-gradient-to-b from-background via-background/45 to-transparent
Carrossel, base:             bg-gradient-to-t from-background/90 to-transparent
Montra, nome da tira:        bg-gradient-to-t from-surface via-surface/85 to-transparent
```

**Os véus da ficha cobrem troços, não a imagem toda.** É a correcção que o tema
claro obrigou a fazer: no escuro, um véu a atravessar a fotografia inteira
escurecia-a e passava despercebido; a claro **lava-a** de ponta a ponta, e o
que se ganha em leitura perde-se todo no carro. O de baixo cobre dois terços, o
de cima 128px, e o meio da fotografia fica com a cor que tem.

A abertura da home não leva véu nenhum, e é por isso que o texto dela **não**
assenta sobre fotografia: antracite sobre relva verde e lona laranja não se lê,
e a alternativa era escurecer a imagem — ou seja, voltar ao tema escuro por
outra porta.

## Foco

Definido globalmente, uma vez:

```css
:focus-visible { outline: 2px solid var(--laranja); outline-offset: 2px; }
```

Não sobrepor por componente. Se um controlo precisar de foco diferente, o
problema é o controlo.

E a selecção de texto: `::selection` é `background: laranja; color: ink` — pela mesma razão que tudo o resto sobre laranja.

## Nunca

- **Escrever cores em hex ou `rgb()`.** Todas as cores vivem em tokens; usar as
  utilities (`bg-laranja`, `text-muted`, `border-line`). A única excepção
  existente é o `rgba()` dentro do valor de sombra dos badges.
- **Usar nenhuma classe de cor por omissão do Tailwind** — `orange-500`,
  `red-400`, `emerald-500`. Um token que não está no `@theme inline` não
  existe; se faltar, acrescenta-se lá.
- **Voltar a pôr o "Vendido" a vermelho.** Ver a secção acima — colide com a
  cor da marca, e o vermelho está reservado a erro.
- **Usar `text-laranja`.** Não passa contraste sobre papel. Para laranja em
  texto existe o `--laranja-deep`, sempre.
- **Usar laranja em áreas grandes.** Sem excepções — deixou de haver.

  Houve uma: a `FaixaLona`, uma banda de margem a margem, justificada por ali
  a área laranja **ser** a identidade (a lona de seis metros à porta do
  stand). O que a derrubou não foi a cor, foi a função: as cinco palavras que
  ela gritava são a soma dos títulos das secções 02 e 03, que vêm logo a
  seguir e dizem o mesmo com calma. Uma banda sem trabalho não justifica uma
  excepção a uma regra.

  No lugar dela está a `Promessa`, escura, com o laranja em acento. O
  raciocínio completo está em `Promessa.tsx`.
- **Usar o `--muted` dentro de uma faixa escura.** É `--escuro-muted`; o outro
  dá 2,8:1 ali.
- **Aumentar a croma dos laranjas.** Sai do sRGB, o browser corta, e a cor
  deixa de bater com o logótipo.
- **Alargar os degradês para cinco paragens.** É o sistema antigo a voltar.
- **Usar branco puro** em gradientes; usar `from-background`.
- **Introduzir dark mode, classes `dark:` ou media queries de tema.** O tema é
  claro e fixo.
- **Mexer num token sem correr `npm run check:contraste`.** Vários estão no
  limite por serem o valor mais forte que ainda passa.
- **Voltar a pôr degradês em texto** (`background-clip: text`). A classe que
  fazia isto existiu e foi removida; ver acima.
- **Sobrepor `:focus-visible`** por componente.
