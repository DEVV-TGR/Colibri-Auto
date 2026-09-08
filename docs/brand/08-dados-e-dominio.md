# 08 — Dados e domínio

> **Aplica-se a** — o modelo de dados, o inventário e os helpers de derivação e filtro.
> **Fonte de verdade** — `src/lib/types.ts`, `src/data/viaturas.ts`, `src/lib/{derivados,filtros,format,slug,marcas}.ts`.
> **Ler antes de** — acrescentar uma viatura, um campo ou um filtro.

> Quando o painel de gestão entrar, `src/data/viaturas.ts` deixa de ser a fonte dos dados e passa a ter dois papéis: alimentar o seed inicial e servir de recurso quando não há base de dados configurada. O tipo `Viatura` e tudo o resto neste documento mantêm-se. Ver [`docs/admin/01`](../admin/01-arquitetura.md).

## O tipo `Viatura`

Trinta campos. **Todos obrigatórios — nenhum opcional.** É a decisão estrutural mais importante do modelo: garante que nenhuma viatura aparece no site com ficha incompleta, e dispensa verificações defensivas na UI.

```ts
interface Viatura {
  id: string;                    // "v-0001"
  marca: string;                 marcaSlug: string;
  modelo: string;                modeloSlug: string;
  versao: string;
  preco: number;                 // euros, inteiro
  registoMes: number;            registoAno: number;   // 1–12, ano cheio
  quilometros: number;
  lugares: number;               portas: number;
  segmento: Segmento;
  combustivel: Combustivel;
  potenciaCv: number;            cilindradaCc: number;
  transmissao: Transmissao;
  cor: string;                   corInterior: string;
  origem: string;                estado: string;        garantia: string;
  livroRevisoes: boolean;        segundaChave: boolean;
  classePortagem: string;
  matricula: string;             vin: string;           // "—" quando não são públicos
  fotos: string[];
  extras: ExtrasCategoria[];
  destaque: boolean;
  estadoVenda: EstadoVenda;
  ivaDedutivel: boolean;
  descricao: string;
}
```

### Uniões

```ts
type Combustivel = "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
type Transmissao = "Automática" | "Manual";
type Segmento    = "Coupé" | "SUV" | "Carrinha" | "Berlina" | "Cabrio" | "Citadino";
type EstadoVenda = "disponivel" | "reservado" | "vendido";

interface ExtrasCategoria { categoria: string; itens: string[] }
```

**Atenção à assimetria:** `Combustivel`, `Transmissao` e `Segmento` são valores *de apresentação* — acentuados, capitalizados, e vão diretos para o ecrã. `EstadoVenda` é um valor *de estado* — minúsculas, sem acentos (`disponivel`, não `disponível`), e nunca é mostrado tal e qual. Manter a distinção ao acrescentar valores.

## Inventário atual

Sete viaturas, cinco marcas, em `src/data/viaturas.ts`.

| id | Viatura | Preço | Registo | Km | Segmento | Comb. | Cv | Transm. | Fotos | Destaque | Estado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `v-0001` | Ford Focus SW 1.0 EcoBoost S&S Titanium | 4 999 | 12/2014 | 201 375 | Carrinha | Gasolina | 125 | Manual | **19** | ✅ | disponível |
| `v-0002` | Mercedes-Benz E 350 Coupé 7G-Tronic | 16 990 | 6/2009 | 261 345 | Coupé | Diesel | 231 | Auto | 1 | ✅ | disponível |
| `v-0003` | Renault Kangoo 1.5 dCi Confort S&S | 11 990 | 5/2019 | 127 381 | Carrinha | Diesel | 90 | Manual | 1 | ✅ | **reservado** |
| `v-0004` | Mazda CX-3 1.5 SKYACTIV-D | 11 500 | 9/2015 | 146 751 | SUV | Diesel | 105 | Manual | 1 | ✅ | disponível |
| `v-0005` | Volkswagen Golf 1.6 TDI Trendline BlueMotion | 9 490 | 4/2013 | 286 762 | Citadino | Diesel | 105 | Manual | 1 | ❌ | disponível |
| `v-0006` | Renault Captur 1.5 dCi | 8 350 | 2/2015 | 200 050 | SUV | Diesel | 90 | Manual | 1 | ❌ | disponível |
| `v-0007` | Mercedes-Benz B 150 Autotronic | 6 490 | 7/2006 | 219 975 | Berlina | Gasolina | 95 | Auto | 1 | ❌ | **vendido** |

Constantes em todas: `estado: "Usado"`, `classePortagem: "Classe 1"`, `segundaChave: true`. `origem` é `"Nacional"` em todas menos o Ford, que é importado. `garantia` é `"12 meses"` em todas menos o Ford (`"18 meses"`).

### De onde vieram

Não são inventadas: são as viaturas que o stand tem, reconstruídas a partir das duas únicas fontes públicas que existem.

- **`v-0001`, o Ford Focus SW**, vem do anúncio no Standvirtual — o único que a Colibri tem publicado. Traz ficha técnica completa (cerca de 95 atributos), descrição escrita pelo stand e 19 fotografias a 1600 px. É a viatura em melhor estado neste ficheiro e a que se abre numa demonstração.
- **As outras seis** vêm das publicações do Instagram, cujas legendas dão versão, motor, potência, caixa, cor, quilómetros e preço. Cada publicação é uma imagem única — daí uma fotografia por viatura, e daí o item aberto em [`docs/por-confirmar.md`](../por-confirmar.md).

### `SEM_DADOS`, e porque é que existe

Seis das sete viaturas têm `matricula` e `vin` a `"—"`, através da constante `SEM_DADOS` no topo do ficheiro. Não são públicos.

A tentação era gerar uns com aspecto credível, e é precisamente o que não se pode fazer num site que vai ser mostrado ao dono das viaturas: ele conhece as matrículas de cor, e reconhece uma que não é dele mais depressa do que lê o título da página. Um traço diz "ainda não preenchemos isto"; um `AA-00-BB` diz "isto é falso", e põe em causa tudo o resto que lá está.

A ficha técnica trata este valor como qualquer outro texto e mostra-o tal e qual — não é preciso caso especial nenhum na UI.

**Lacunas de dados** — valores que os tipos permitem mas que nenhuma viatura tem: combustíveis `Híbrido` e `Elétrico`, segmento `Cabrio`. Os filtros derivam das viaturas, portanto estas opções simplesmente não aparecem na UI. Ao testar esses caminhos, alterar temporariamente uma viatura.

**Os três estados de venda renderizam todos** — `disponivel`, `reservado` (`v-0003`) e `vendido` (`v-0007`) —, e o `v-0003` é ainda o único com `ivaDedutivel: true`, o que faz dele o único card do site com dois badges empilhados. No sistema de origem o `reservado` e o IVA dedutível nunca chegaram a aparecer com dados reais.

### Categorias de extras

Quatro, iguais em todas as viaturas: `Multimédia`, `Conforto`, `Segurança`, `Performance`. Não há categorias one-off — ao contrário do sistema de origem, onde uma edição especial justificava a sua própria. Se aparecer um carro que justifique uma, é aceitável; a regra é descrever um pacote real da viatura, não arrumar melhor a lista.

## Fotografias

Helper no topo de `viaturas.ts`:

```ts
const fotos = (pasta: string, quantidade: number) =>
  Array.from({ length: quantidade }, (_, i) => `/cars/${pasta}/${String(i + 1).padStart(2, "0")}.jpg`);
```

Convenção: `public/cars/<pasta>/01.jpg`, `02.jpg`, … As pastas são `ford-focus-sw` (19 fotos), `mercedes-e-350-coupe`, `renault-kangoo`, `mazda-cx-3`, `vw-golf`, `renault-captur` e `mercedes-b-150` (1 cada).

**A contagem é assimétrica de propósito e é temporária.** Ver [`docs/por-confirmar.md`](../por-confirmar.md): assim que o cliente der as fotografias originais, é largar os ficheiros na pasta e subir o número na chamada a `fotos()`. Nada mais muda — a galeria, o carrossel do card e o lightbox lidam com qualquer contagem.

**Créditos:** as fotografias vêm das fontes públicas do stand — o anúncio no Standvirtual e o Instagram — e pertencem à Colibri Auto. Detalhe, e o que foi cortado de cada uma, em [`public/cars/CREDITS.md`](../../public/cars/CREDITS.md) — manter atualizado ao acrescentar viaturas.

## Helpers

### `src/lib/derivados.ts` — as opções nascem dos dados

Nenhuma lista de marcas, modelos ou combustíveis é hard-coded. Tudo se deriva de `viaturas` e se ordena com `localeCompare(…, "pt")`:

| Função | Devolve |
|---|---|
| `getMarcas()` | `{ nome, slug }[]`, deduplicado por `Map` |
| `getModelos(marcaSlug?)` | `{ nome, slug, marcaSlug }[]`, filtrável por marca |
| `getCombustiveis()` / `getTransmissoes()` / `getSegmentos()` | valores únicos, ordenados |
| `getIntervalos()` | `{ preco, ano, km }`, cada um `[min, max]` |
| `getDestaques()` | viaturas com `destaque: true` |

`getIntervalos()` arredonda para fora — passo 1000 no preço, 5000 nos km; o ano fica exato. Dá limites redondos aos sliders sem cortar viaturas.

### `src/lib/filtros.ts`

```ts
interface Filtros {         // 12 campos, todos opcionais
  marca?, modelo?, combustivel?, transmissao?, segmento?,
  precoMin?, precoMax?, anoMin?, anoMax?, kmMin?, kmMax?, ordenar?
}
type Ordenacao = "relevancia" | "preco-asc" | "preco-desc" | "ano-desc" | "ano-asc" | "km-asc";
```

- `parseFiltros(searchParams)` — lê o URL, tolerante a arrays e valores inválidos (`umValor` / `umNumero`); descarta `ordenar` que não esteja em `ORDENACOES`.
- `serializeFiltros(filtros)` — omite `undefined`, `""` **e `"relevancia"`**. O default não suja o URL.
- `filtrarViaturas(lista, filtros)` — conjunção simples; marca e modelo comparam por **slug**.
- `ordenarViaturas(lista, ordenar)` — copia antes de ordenar (`[...lista]`), nunca muta.

**A ordenação `"relevancia"`** é a regra de negócio do catálogo, por esta ordem:

1. Estado: `disponivel` (0) → `reservado` (1) → `vendido` (2)
2. `destaque` primeiro
3. Preço ascendente

Ou seja: o que se pode comprar aparece primeiro, os destaques puxam para cima, e a preços iguais o mais barato ganha.

`ano-desc` e `ano-asc` desempatam pelo mês — `b.registoAno - a.registoAno || b.registoMes - a.registoMes`.

### `src/lib/slug.ts`

```ts
urlViatura(v)              // /carros/{marcaSlug}/{modeloSlug}/{id}
urlViaturasPorMarca(slug)  // /viaturas?marca={slug}
```

**Não há função de slugificação.** Os slugs estão escritos à mão nos dados (`marcaSlug: "mercedes-benz"`, `modeloSlug: "cla-220-d"`). É deliberado: gerar slugs em runtime tornaria os URLs reféns da pontuação do nome.

> **Com o painel de gestão, isto muda.** O cliente escreve a marca num formulário, logo o slug passa a ser gerado — mas **ao gravar**, e guardado na base. A regra de não gerar na leitura mantém-se. Ver [`docs/admin/01`](../admin/01-arquitetura.md).

### `src/lib/marcas.ts`

Mapa `LOGOS` de slug → ficheiro em `/logo/marcas/`. Cinco entradas, uma por marca do inventário: `ford.svg`, `mercedes-benz.webp`, `renault.svg`, `mazda.svg`, `volkswagen.svg`. `logoMarca(slug)` devolve o caminho ou `null` — a grelha faz fallback ao nome da marca, no mesmo espaço e com o mesmo peso óptico.

Ao acrescentar uma marca, acrescentar o logótipo aqui, ou o fallback trata do assunto.

## Acrescentar uma viatura

1. Criar `public/cars/<pasta>/` com fotos numeradas `01.jpg`…
2. Acrescentar a entrada em `src/data/viaturas.ts` com os **30 campos** preenchidos e `fotos("<pasta>", N)`.
3. `marcaSlug` e `modeloSlug` à mão, em kebab-case sem acentos.
4. Se a marca é nova: logótipo em `public/logo/marcas/` e entrada em `LOGOS`.
5. Atualizar `public/cars/CREDITS.md`.

Filtros, opções de pesquisa, intervalos dos sliders e rotas estáticas atualizam-se sozinhos.

## Nunca

- **Tornar um campo de `Viatura` opcional**, ou acrescentar uma viatura com ficha parcial.
- **Hard-coded de marcas, modelos, combustíveis ou intervalos** — derivar de `derivados.ts`.
- **Gerar slugs em runtime.** São dados.
- **Mutar a lista de viaturas.** `ordenarViaturas` copia; manter o padrão.
- **Comparar marca ou modelo por nome.** Filtra-se por slug.
- **Pôr `"relevancia"` no URL** — `serializeFiltros` omite-o de propósito.
- **Misturar convenções nas uniões** — valores de apresentação acentuados, valores de estado em minúsculas sem acentos.
