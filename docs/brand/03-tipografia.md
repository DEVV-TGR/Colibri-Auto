# 03 — Tipografia

> **Aplica-se a** — todo o texto: headings, corpo, rótulos, metadados, preços.
> **Fonte de verdade** — `src/app/layout.tsx` (carregamento), `src/app/globals.css` (escala fluida e peso base).
> **Ler antes de** — escrever qualquer heading ou bloco de texto novo.

## As três fontes

Carregadas por `next/font/google` em `src/app/layout.tsx`, todas com
`subsets: ["latin"]`.

| Fonte | Variável | Utility | Onde |
|---|---|---|---|
| **Montserrat** | `--font-display` | `font-display` | Todos os headings e todos os preços. 50 usos |
| **Geist** | `--font-geist-sans` | `font-sans` | Corpo. É o default do `<body>` |
| **Geist Mono** | `--font-geist-mono` | `font-mono` | **Só matrícula e VIN**, em `SpecsTable.tsx` |

### Porque Montserrat

O sistema de origem usava **Bodoni Moda**, um Didone. Era a escolha certa lá:
o Império vendia-se como premium, e um Didone é a fonte da alta-costura e da
capa da Vogue. A Colibri não se vende assim. O logótipo é um grotesco
geométrico pesado dentro de um selo redondo, os carros custam entre cinco e
dezassete mil euros, e a promessa pintada na lona é "compra · venda · retoma".
Um Didene por cima disso lê-se como a assinatura de outra empresa.

Montserrat é o desenho comercialmente disponível mais próximo do lettering do
selo: mesma construção geométrica, mesmo `a` de dois andares, mesmas
maiúsculas largas.

**Só dois pesos carregados — 600 e 800.** Não é uma variable font com tudo
disponível: carregar a família toda seriam cerca de 300 kB para nada.

**Sem itálico.** Em Montserrat o itálico é um oblíquo sintético e não
acrescenta nada. O realce dos headings passou a fazer-se por **peso e cor**,
que é como um grotesco o faz — ver a secção da assinatura.

O contraste continua a existir, só mudou de eixo: era didone contra grotesco,
agora é **grotesco geométrico contra grotesco neutro** (Montserrat + Geist).
Não o diluir com uma quarta família.

## Escala fluida

Três classes em `globals.css`, todas `clamp()` — os headings escalam com a
viewport sem breakpoints.

| Classe | `font-size` | `line-height` | `letter-spacing` |
|---|---|---|---|
| `.h-hero` | `clamp(2.75rem, 7vw, 5rem)` | `1.02` | `-0.03em` |
| `.h-section` | `clamp(2rem, 4.2vw, 3.25rem)` | `1.06` | `-0.025em` |
| `.h-sub` | `clamp(1.5rem, 2.6vw, 2.125rem)` | `1.12` | `-0.02em` |

Estes números são mais pequenos e mais apertados do que os do sistema de
origem, e a razão é o desenho da letra:

- **O tecto do `.h-hero` desceu de 6.5rem para 5rem.** Um Didone aguenta 6.5rem
  porque metade dos traços são finos como um cabelo e o peso na página fica
  leve. Montserrat a 700 é uma mancha sólida — ao mesmo corpo esmagava a
  secção inteira.
- **O tracking apertou** (de `-0.015em` para `-0.03em` no hero). Num grotesco
  pesado o espaço entre letras cresce opticamente com o corpo, e sem apertar o
  título parece desmontado.
- **As entrelinhas ganharam um cabelo** (de `1` para `1.02`). As maiúsculas do
  Montserrat são altas e a `1` as linhas tocavam-se.

Usar sempre estas classes para headings; nunca `text-5xl` e afins.

Uso: `.h-hero` só na abertura da home; `.h-section` nos `<h1>`/`<h2>` de página e secção;
`.h-sub` em subsecções dentro do detalhe (Ficha técnica, Extras).

## O peso base

```css
@layer base {
  .font-display { font-weight: 600; }
}
```

Com o Bodoni isto não era preciso: um Didone a 400 já tinha presença. Um
grotesco a 400 é texto corrido em ponto grande — sem esta regra os headings
todos ficavam moles. E como só se carregam os pesos 600 e 800, a 400 o browser
ia buscar o mais próximo por sua conta, ficando à mercê de qual.

**Vai em `@layer base` de propósito.** As utilities do Tailwind vivem numa
camada acima, portanto `font-extrabold` na palavra destacada continua a ganhar
a isto — que é exactamente o que se quer. Fora de camada nenhuma, esta regra
ganhava a todas elas e o realce dos headings desaparecia sem dar erro.

## A assinatura: última palavra a 800 em laranja

**A regra tipográfica mais importante do projecto.** Todo o heading de secção
termina com a última palavra (ou o último par de palavras) em Montserrat 800
laranja:

```tsx
<h2 className="font-display h-section text-ink">
  Viaturas em <span className="font-extrabold text-laranja">destaque</span>
</h2>
```

Era itálico laranja no sistema de origem. O mecanismo mudou — 600 → 800 mais
cor, em vez de romano → itálico — mas a regra é a mesma e o efeito também: a
palavra que interessa salta, e a página inteira fica com uma cadência
reconhecível.

Sem excepção, em todas as secções:

| Heading | Onde |
|---|---|
| Carros usados *sem letra pequena.* | `home/Abertura.tsx` |
| Quatro para *começar* | `home/Destaques.tsx` |
| Compra, venda e *retoma* | `home/TresAcoes.tsx` |
| O que vai no *preço* | `home/Incluido.tsx` |
| Estamos na Avenida Maria *Brito* | `home/OndeEstamos.tsx` |
| Não está aqui o que *procura*? | `home/ChamadaFinal.tsx` |
| Está tudo *aqui* | `app/(site)/viaturas/page.tsx` |
| Ficha *técnica* | `car/SpecsTable.tsx` |
| Extras e *equipamento* | `car/ExtrasList.tsx` |
| Também temos *estas* | `car/Sugestoes.tsx` |
| Venha *conhecer-nos* | `app/(site)/contactos/page.tsx` |
| Esta página já não *existe* | `app/not-found.tsx` |

Duas variações deliberadas:

- **Abertura da home** — o realce é a **linha inteira** («sem letra pequena.»)
  e não a última palavra, em `text-laranja-deep` chapado. Já foi um degradê
  recortado pela forma das letras (`.text-laranja-metal`); saiu com a abertura
  nova. Um degradê em texto é decoração que não significa nada, e num título
  obriga a escolher entre o efeito ser visível e a palavra ser legível a meio.
  O chapado dá 5,20:1 sobre o branco da abertura e lê-se de ponta a ponta.
- **Página de detalhe** — o realce cai sobre a **versão** da viatura
  (`<span className="font-extrabold text-laranja">{v.versao}</span>`), não
  sobre a última palavra. Faz sentido: separa marca+modelo da versão,
  mantendo a assinatura.

Ao criar uma secção nova, seguir a regra. Um heading sem a última palavra a 800
laranja destoa imediatamente.

## Os seis papéis tipográficos

Receitas copiáveis. Se o texto novo não encaixa em nenhuma, provavelmente está
a inventar-se um papel a mais.

**1. Heading de secção**
```
font-display h-section text-ink        (+ última palavra em font-extrabold text-laranja)
```

**2. Eyebrow** — o rótulo pequeno acima de um heading
```
text-xs uppercase tracking-[0.3em] text-laranja
```

**3. Rótulo de campo** — em formulários e cabeçalhos de coluna
```
text-xs uppercase tracking-[0.2em] text-muted
```
Em cabeçalhos de coluna do footer, o mesmo com `text-laranja`.

**4. Corpo**
```
text-sm leading-relaxed text-muted      (+ max-w-xs | max-w-md | max-w-2xl)
```
Parágrafos levam **sempre** `leading-relaxed` e **sempre** uma largura máxima.
`text-sm` é o tamanho de corpo dominante do site; `text-base` só quando o texto
é o protagonista da secção.

**5. Metadados de viatura** — a linha `Mês/Ano · Combustível · Km`
```
text-xs uppercase tracking-[0.15em] text-muted
```
com os separadores em elemento próprio:
`<span className="text-laranja-deep">·</span>`.

**6. Preço**
```
font-display text-laranja
```
`text-4xl` no cartão sticky da ficha. Nos cards e na abertura da ficha o preço
não é texto laranja sobre fundo escuro, mas o inverso — uma **etiqueta**
`.laranja-fill` com texto `text-background`, sobre a fotografia. Ver
[05 — Componentes](05-componentes.md).

Em qualquer dos casos é sempre Montserrat: é o segundo elemento mais importante
da página, a seguir à fotografia.

## O logótipo em texto

O `Logotipo` (`src/components/ui/Logotipo.tsx`) escreve "COLIBRI AUTO" ao lado
do selo, e usa a única combinação do projecto que não está nas seis receitas:

```
font-display font-extrabold uppercase tracking-[0.06em]
```

O tracking é apertadíssimo comparado com os `0.2em`/`0.3em` do resto — porque
aqui não é um rótulo, é um wordmark, e reproduz a compressão que as letras têm
na lona do stand. Não copiar este valor para mais lado nenhum.

## Tracking

O `letter-spacing` é o que dá o ar editorial ao texto pequeno. A escala em uso:

| Valor | Onde | Usos |
|---|---|---|
| `tracking-[0.3em]` | Eyebrows | 10 |
| `tracking-[0.2em]` | Rótulos de campo, cabeçalhos de coluna | 14 |
| `tracking-[0.15em]` | Metadados, badges | 8 |
| `tracking-[0.14em]` | Badge do carrossel | 2 |
| `tracking-[0.06em]` | Wordmark do logótipo | 1 |
| `tracking-wide` | Botões e links de nav | 19 |

Regra: **quanto mais pequeno e mais uppercase, mais aberto o tracking.** Nunca
uppercase sem tracking. A excepção é o wordmark, e está explicada acima.

## Pesos

Quatro pesos, e mais nenhum:

| Peso | Usos | Onde |
|---|---|---|
| `font-extrabold` (800) | 24 | A palavra destacada dos headings, e o wordmark |
| `font-medium` (500) | 21 | CTAs e badges |
| `font-normal` (400) | 5 | Anulações pontuais dentro de um bloco mais pesado |
| `font-thin` (100) | 2 | Setas `‹ ›` do carrossel |

Mais o **600 implícito** do `.font-display`, que não se escreve em lado nenhum
porque vem do `@layer base`.

`font-semibold` e `font-light` **não existem no projecto** — 0 usos. Fora do
par 600/800 dos headings, a hierarquia faz-se por tamanho, cor e família, e não
por peso. É o que mantém o registo sóbrio apesar de a fonte de títulos ser
pesada.

## Nunca

- **`font-semibold` ou `font-light`.** Não existem aqui.
- **Um peso que não seja 600 ou 800 em `font-display`.** São os únicos
  carregados; qualquer outro faz o browser aproximar, e o resultado varia com o
  browser.
- **Itálico em `font-display`.** É oblíquo sintético — foi por isso que saiu.
- **Montserrat em corpo de texto.** É fonte de display — headings e preços,
  nada mais.
- **`text-5xl` e afins em headings.** Usar `.h-hero` / `.h-section` / `.h-sub`.
- **Mais do que a última palavra destacada** num heading. A excepção é a versão
  da viatura na página de detalhe.
- **Uppercase sem tracking**, ou tracking em texto de corpo.
- **Parágrafos sem `leading-relaxed` ou sem largura máxima.**
- **Uma quarta família tipográfica.** Três chegam, e o contraste entre elas é
  intencional.
