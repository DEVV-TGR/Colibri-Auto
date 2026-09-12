# Fotografias das viaturas

Todas as fotografias desta pasta são do próprio stand, recolhidas das fontes
públicas da Colibri Auto em setembro de 2026.

| Pasta | Fotos | Origem |
|---|---|---|
| `ford-focus-sw/` | 19 | Anúncio no [Standvirtual](https://colibriauto.standvirtual.com/inventory), a 1600 px. A faixa inferior com a marca de água do portal foi cortada. |
| `mercedes-e-350-coupe/` | 1 | Publicação no Instagram [@colibriauto_stand](https://www.instagram.com/colibriauto_stand/) |
| `mercedes-b-150/` | 1 | Instagram |
| `vw-golf/` | 1 | Instagram |
| `mazda-cx-3/` | 1 | Instagram |
| `renault-captur/` | 1 | Instagram, com a etiqueta de preço e a faixa de contactos cortadas |
| `renault-kangoo/` | 1 | Instagram, com a etiqueta de preço e a faixa de contactos cortadas |

## `hero/abertura.jpg` — a imagem da abertura

**Não é uma fotografia: é um render**, gerado para servir de fundo ao primeiro
ecrã. Mostra o modelo que está no stock (o E 350 Coupé) num espaço neutro, que
não se faz passar pelas instalações do stand. Está registado em
`docs/por-confirmar.md` para o cliente saber o que é.

2752×1536. Existe porque nenhuma fotografia do inventário serve para fundo de
ecrã inteiro: as de alta resolução (1600 px) são as exteriores com a lona
laranja a ocupar o terço de cima, e as boas — o interior em pele cognac do Ford
(08, 12, 14, 18), sem lona nem relva — são 900 px e em retrato.

**O original trazia o selo Colibri aplicado ao canto superior direito**, e esse
foi removido: o cabeçalho já tem o logótipo ao canto esquerdo, e dois wordmarks
da mesma marca no mesmo ecrã competem um com o outro.

Como foi removido, para ser repetível: a parede por trás do selo é lisa —
medida a RGB 24 com desvio-padrão 1 — portanto clonou-se a banda limpa do topo
(x 2250–2752, y 0–40), esticou-se na vertical até 552 px (o que reproduz o
degradê horizontal da parede sem inventar textura), e compôs-se por cima com as
arestas interior e inferior esbatidas. Feito com o `sharp` que o Next já traz.
Prova: a zona do selo passou de desvio-padrão 93 para 2, igual à vizinhança.

## O que falta

Cada publicação do Instagram é uma imagem única, e é essa a razão de seis das
sete viaturas terem uma fotografia só. **Pedir ao cliente as fotografias
originais** — ele tem-nas todas, sem a etiqueta de preço nem a faixa de
contactos sobrepostas, e em resolução muito superior. Chegando: largar os
ficheiros numerados (`01.jpg`, `02.jpg`, …) na pasta da viatura e subir o
número na chamada a `fotos()` em `src/data/viaturas.ts`.
