# Badges de estado das viaturas

Sinais/placas que aparecem sobre a foto de cada viatura para indicar o seu
estado de venda. Ficam sempre no **canto superior esquerdo** do card.

## Estados e cores

| Estado (`estadoVenda`) | Badge | Aspeto |
|---|---|---|
| `disponivel` | *(sem badge)* | — |
| `reservado` | **Reservado** | Laranja (`laranja-fill`) |
| `vendido` | **Vendido** | Grafite (`vendido-fill`) |

Existe ainda um badge independente **IVA Dedutível**, controlado pelo campo
`ivaDedutivel` (bool), com contorno laranja. Pode acumular com os de estado.

Quando uma viatura está `vendido`, além do badge a foto fica esbatida
(`opacity`/`saturate` reduzidos) e o preço é substituído pela palavra
"Vendido".

O vendido é **grafite e não vermelho**, ao contrário do sistema de onde este
veio. O vermelho ficava a 23° de hue do laranja da marca, com a mesma croma —
a 20px de distância num card são a mesma mancha, e o badge lia-se como um selo
da casa em vez de um aviso. O vermelho ficou reservado a erro. O raciocínio
completo está no token `--vendido` em `src/app/globals.css`.

## Onde aparece

- **Catálogo `/viaturas`** e qualquer grelha de cards — componente `CarCard`.
- **Carrossel "Viaturas em Destaque"** na homepage — componente `DestaquesCarrossel`.

## Como marcar uma viatura

Editar `src/data/viaturas.ts` e definir o campo `estadoVenda` da viatura:

```ts
estadoVenda: "vendido",   // "disponivel" | "reservado" | "vendido"
```

Não é preciso mais nada — o badge e o tratamento visual são automáticos.

## Estado atual

- **Mercedes-Benz B 150** (`v-0007`) → `vendido`. Vendido a sério: a
  publicação do Instagram de 15 semanas atrás diz "VENDIDO ✅".
- **Renault Kangoo** (`v-0003`) → `reservado`, e também `ivaDedutivel: true`,
  o que faz este ser o único card do site com dois badges empilhados. O anúncio
  no Standvirtual responde 410 (removido) mas o carro continua a aparecer no
  Instagram — daí reservado e não vendido. Confirmar com o cliente.
- Todas as restantes → `disponivel` (sem badge).

Os três estados renderizam com os dados actuais. No sistema de origem o
`reservado` nunca chegou a aparecer, e o código dele nunca foi visto a correr.

## Ficheiros envolvidos

- `src/data/viaturas.ts` — campo `estadoVenda` por viatura.
- `src/lib/types.ts` — tipo `EstadoVenda`.
- `src/components/car/BadgeEstado.tsx` — badge nos cards.
- `src/components/home/DestaquesCarrossel.tsx` — badge no carrossel de destaques.
- `src/app/globals.css` — tokens de cor (`--laranja*`, `--vendido*`) e as
  classes de preenchimento (`.laranja-fill`, `.vendido-fill`).
