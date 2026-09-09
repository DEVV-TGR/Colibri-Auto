# Por confirmar com a Colibri Auto

O site foi construído a partir das fontes públicas do stand. Cinco coisas não
estavam lá e ficaram assumidas — todas com um `TODO` no sítio do código onde
vivem. Esta é a lista para levar à reunião.

## 1. Horário de abertura — o mais urgente

**Onde:** `src/data/stand.ts`, campo `horarios`.

O perfil do Standvirtual tem os sete dias marcados como fechados (nunca foi
preenchido) e o Instagram não diz o horário em lado nenhum. O que está no site
é o horário típico de um stand da zona:

| | |
|---|---|
| Segunda a Sexta | 09:00 – 13:00 · 14:00 – 19:00 |
| Sábado | 09:00 – 13:00 |
| Domingo | Encerrado |

Isto não é só texto na página de contactos: alimenta o `openingHours` do
JSON-LD, que é o campo que o Google usa para mostrar "Aberto agora" na ficha do
Maps. Ou seja, neste momento o site está preparado para dizer ao Google horas
que ninguém confirmou. **Corrigir antes de qualquer coisa ir para o ar.**

## 2. Domínio

**Onde:** `src/lib/site.ts`, constante `SITE_URL`.

Está `colibriauto.pt`, que à data estava livre. É o `metadataBase` de toda a
aplicação — canonicals, sitemap, JSON-LD e a imagem de partilha. Um domínio
errado aqui não dá erro nenhum: só faz com que os links partilhados em WhatsApp
e Facebook apareçam sem imagem, porque a vão pedir a um sítio que não existe.

## 3. Fotografias das viaturas

**Onde:** `public/cars/`, detalhe em [`public/cars/CREDITS.md`](../public/cars/CREDITS.md).

O Ford Focus SW tem 19 fotografias, tiradas do anúncio do Standvirtual. As
outras seis viaturas têm **uma cada**, porque cada publicação do Instagram é
uma imagem única — e duas dessas tiveram de levar corte para tirar a etiqueta
de preço e a faixa de contactos que estão sobrepostas na arte.

Eles têm os originais. É a diferença entre uma ficha de viatura que se percorre
e uma que acaba no primeiro ecrã, e é o item desta lista com maior efeito
visível no site.

## 4. A morada no Standvirtual está errada

**Onde:** no perfil deles, não no repositório.

O site diz **Avenida Maria Brito 3343**, que é o que o Instagram, o Google e o
cliente confirmam. O perfil do Standvirtual diz "Avenida Mário Brito" — e foi
de lá que os dados vieram para aqui antes de a grafia ser confirmada.

Não é um pormenor de ortografia. O Google cruza o nome, a morada e o telefone
do negócio entre o site, o Perfil de Empresa e os portais; quando divergem,
deixa de ter a certeza de que são a mesma entidade e a ficha perde posições no
Maps. **Corrigir no Standvirtual.**

## 5. Facebook

**Onde:** `src/data/stand.ts`, campo `facebook`, hoje vazio.

Não foi encontrada página. Enquanto estiver vazio, o botão não aparece no
rodapé nem na página de contactos, e o `sameAs` do JSON-LD leva só o Instagram.
Se existir, basta preencher — o resto já está preparado.

## 6. Matrículas e VIN

**Onde:** `src/data/viaturas.ts`, constante `SEM_DADOS`.

Seis das sete viaturas têm a matrícula e o VIN a `—` na ficha técnica. Não são
públicos, e inventá-los era o pior que se podia fazer num site que vai ser
mostrado ao dono das viaturas: ele sabe as matrículas de cor.

---

## O que já está confirmado

Isto foi tudo tirado das fontes deles e não precisa de confirmação — mas vale a
pena passar os olhos na reunião, porque é o que está no ar em cada página:

- **Morada** — Avenida Maria Brito 3343, 4455-495 Perafita (Matosinhos)
- **Telefone** — 912 458 400 · **WhatsApp** — 928 492 602
- **Email** — geral.colibrilda@gmail.com
- **Instagram** — [@colibriauto_stand](https://www.instagram.com/colibriauto_stand/)
- **Assinatura** — "Compra · Venda · Retoma", tal como está na lona do stand
- **Sete viaturas**, com preços, quilómetros, motorizações e estado tirados dos
  anúncios: seis disponíveis (uma reservada) e uma vendida
