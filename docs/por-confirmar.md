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

## 7. As fotografias — o ponto mais caro de todos

**Onde:** `public/cars/`, `public/cars/CREDITS.md`.

As sete viaturas estão todas fotografadas da mesma maneira: carro em cima da
relva sintética, a lona laranja de seis metros atrás, vedação ao fundo, luz
dura de meio-dia, telemóvel. Seis das sete têm **uma** fotografia, recortada
do Instagram a 630 px. Só o Ford tem álbum a sério (19, do Standvirtual).

Isto não é um detalhe de acabamento — é o que impede o site de parecer o que
devia. A abertura da home foi refeita quatro vezes por causa disto: duas a
tentar arranjar esta fotografia com tipografia e grelha, uma a recortar o carro
do fundo, e a que ficou a usar uma **imagem feita para o efeito** (ver abaixo).
Nenhuma das três primeiras falhou por causa do layout.

**Pedir ao cliente:** as fotografias originais, sem a etiqueta de preço nem a
faixa de contactos sobrepostas, e em resolução alta. Ele tem-nas todas.

Duas coisas voltam ao normal quando chegarem:

- O `object-[50%_62%]` no `CarCard` — um remendo para as fotos do Instagram
  não mostrarem só lona — volta a `object-center`. (Hoje só faz efeito em três
  das sete; a explicação da aritmética está no comentário do componente.)
- A abertura pode trocar o render por fotografia própria: é a constante `FUNDO`
  em `Abertura.tsx`, e mais nada.

**`scripts/recortar.py` fica.** Não é usado pelo site neste momento, mas é a
ferramenta que separa um carro do fundo a partir das fotografias do stand
(Vision do macOS, offline). Serve no dia em que se quiser um carro sobre chão
limpo — num card, numa página de campanha, ou numa abertura futura.

**O melhor que se pode pedir:** meia dúzia de fotos de cada carro tiradas
longe da lona e com o carro a preencher o enquadramento. Não é preciso
fotógrafo; é preciso não ter um cartaz laranja atrás.

### A imagem da abertura é um render — dizer isto ao cliente

`public/cars/hero/abertura.jpg`, o fundo do primeiro ecrã, **não é uma
fotografia**: é uma imagem gerada, do modelo que está no stock (o E 350 Coupé),
num espaço neutro. Não se faz passar pelas instalações deles, e o carro
anunciado tem as fotografias verdadeiras na ficha dele.

Como imagem de ambiente isto é prática corrente no sector, mas **vale o cliente
saber**, para não ser apanhado desprevenido se alguém lhe perguntar. É também a
decisão que se reverte sozinha no dia em que houver fotografia própria à altura:
muda-se a constante `FUNDO` em `Abertura.tsx` e mais nada.

## 8. Texto do cliente editado na secção «Promessa»

**Onde:** `src/data/stand.ts` (`sobre[0]`) e `src/components/home/Promessa.tsx`.

A secção escura entre a abertura e a montra tem por título:

> Escolhidas pelo estado em que estão, não pela etiqueta que têm.

**A frase é do cliente** — estava em `stand.sobre[0]`, o parágrafo que ele
escreveu sobre o stand, e passava despercebida a meio dele na secção da morada.
Subiu a título.

**Duas coisas para a reunião:**

1. **A oração foi retirada do parágrafo original**, para a mesma frase não
   aparecer duas vezes na página. É uma edição a texto dele, não uma correcção.
   Se preferir o parágrafo como o escreveu, repõe-se — e nesse caso a secção
   precisa de outro título.
2. **Aqui esteve uma frase inventada, e foi retirada.** Dizia «O preço do
   anúncio é o preço final.» Não tinha fonte: o que o cliente afirma é que **a
   garantia** vai incluída no preço, o que não é o mesmo que não haver mais
   nada a pagar — numa compra de usado há quase sempre a transferência de
   propriedade. Fica aqui registada como aviso: é fácil escorregar do tom do
   site para uma afirmação que o stand não pode sustentar ao balcão.

As quatro linhas dos serviços (Compra, Venda, Retoma, Financiamento) foram
escritas a partir do que as secções 02 e 03 já dizem, em versão curta. Convém
serem lidas ao mesmo tempo.

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
