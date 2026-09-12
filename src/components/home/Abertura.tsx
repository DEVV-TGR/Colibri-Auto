import Image from "next/image";
import Link from "next/link";
import { PesquisaRapida, TiraMarcas } from "@/components/home/BarraPesquisa";
import { stand } from "@/data/stand";
import { formatarPreco } from "@/lib/format";
import type { Viatura } from "@/lib/types";

/*
  A abertura da home.

  **Uma fotografia de ecrã inteiro com uma capa escura por cima.**

  O caminho até aqui vale a pena estar escrito, porque é a quarta tentativa e
  as três anteriores falharam todas pela mesma razão.

  As duas primeiras puseram aqui as fotografias do stand: carro em cima de
  relva sintética, lona laranja de seis metros atrás, luz dura de telemóvel,
  seis das sete viaturas com uma única foto saída do Instagram a 630 px. O erro
  não estava no arranjo — estava em pedir a essa fotografia que carregasse meio
  ecrã. Não há grelha nem tipografia que a salve.

  A terceira tirou a fotografia do caminho: fundo branco e o carro recortado a
  flutuar. Resolvia o problema técnico e falhava o resto — um carro sem chão
  não é uma montra, é um catálogo de peças.

  Esta usa uma imagem feita para o efeito, escurecida. O véu é o que torna
  possível o que não era: com a capa por cima, a fotografia deixa de ter de ser
  perfeita em todo o lado e passa a ter de ser boa **onde se vê**.

  ## A imagem

  É um **render** e não uma fotografia do carro real — está registado em
  `docs/por-confirmar.md` para o cliente saber. Mostra o modelo que está no
  stock (o E 350 Coupé), num espaço neutro que não se faz passar pelas
  instalações deles.

  Vinha com o selo Colibri aplicado ao canto superior direito, e esse foi
  removido do ficheiro. Não é preciosismo: o cabeçalho já tem o logótipo ao
  canto esquerdo, e dois wordmarks da mesma marca no mesmo ecrã é exactamente
  o erro que a primeira versão desta secção já tinha documentado. A parede por
  trás do selo era lisa — desvio-padrão 1 em RGB 24 — o que permitiu clonar uma
  banda limpa por cima sem inventar nada; a zona ficou a 16/2, igual à
  vizinhança. O método está em `public/cars/CREDITS.md`.

  ## O chão escuro não é dark mode

  A regra 1 do sistema proíbe o tema alternável e as classes `dark:`, não uma
  secção escura. O rodapé já é `--escuro` em mancha. A página passa a ser
  abertura escura → corpo claro → rodapé escuro.

  O texto forte usa o mesmo `--background` do rodapé. O secundário **não** usa
  o `--escuro-muted` do rodapé, e a razão está medida no comentário da linha de
  factos: aquele token foi calibrado contra uma cor chapada, e esta secção tem
  uma fotografia por baixo. Nenhum tom novo foi inventado — o secundário é o
  mesmo branco, esbatido a 80%.

  ## A altura vem do conteúdo

  Não há `svh` nesta secção. Uma versão anterior usava `62svh` com `lg:h-auto`
  na coluna da imagem, e numa janela alta a fotografia esticava com a linha da
  grelha — o `object-cover` respondia com um grande plano de uma jante. Medido
  a 1440×3400: mil e duzentos píxeis de carro. Uma caixa que não estica não tem
  esse problema.
*/

/**
 * A imagem da abertura.
 *
 * Constante, e de propósito fácil de trocar: quando chegarem fotografias
 * melhores do cliente, muda-se o caminho e mais nada. O `object-position`
 * acompanha, porque o enquadramento depende da imagem.
 */
const FUNDO = {
  src: "/cars/hero/abertura.jpg",
  alt: "Mercedes-Benz E 350 Coupé, o modelo em stock na Colibri Auto",
  /*
    O carro vive no centro-direita da imagem e a zona escura útil à esquerda.
    Empurrar o enquadramento para a direita mantém o carro à vista quando a
    secção é mais larga do que alta e o `object-cover` corta pelos lados.
  */
  posicao: "68% 52%",
} as const;

export function Abertura({ viaturas }: { viaturas: Viatura[] }) {
  /*
    Uma viatura vendida não é stock, e não entra em nenhum dos dois números
    desta secção — nem na contagem nem na pesquisa.

    Antes entrava num e não no outro: a linha de factos dizia «6 viaturas em
    stock» (as não-vendidas) e o botão da pesquisa dizia «Ver 7 viaturas»
    (`filtrarViaturas` ordena as vendidas para o fim mas não as remove). Eram
    dois números a contradizerem-se no mesmo ecrã. O catálogo em `/viaturas`
    continua a mostrar a vendida, com o selo — lá o propósito é ser o registo
    completo; aqui é dizer o que há para comprar.
  */
  const emStock = viaturas.filter((v) => v.estadoVenda !== "vendido");

  /*
    O preço mais baixo é o mínimo real e **não** o `getIntervalos().preco[0]`.
    Esse arredonda para fora, ao milhar, para dar limites redondos aos sliders
    dos filtros — o que ali é certo e aqui era uma mentira: com a viatura mais
    barata a 4 999 €, a abertura anunciava «desde 4 000 €» e não havia nenhum
    carro por esse preço.
  */
  const maisBarato = Math.min(...emStock.map((v) => v.preco));

  return (
    <section className="relative isolate overflow-hidden bg-escuro">
      {/* ── a fotografia ────────────────────────────────────────────── */}
      <Image
        src={FUNDO.src}
        alt={FUNDO.alt}
        fill
        /*
          É o LCP da página. O `priority` está deprecado no Next 16 — a
          documentação em `node_modules/next/dist/docs` manda usar
          `fetchPriority`/`loading` directamente, que é o que o atributo sempre
          significou.
        */
        fetchPriority="high"
        loading="eager"
        /*
          A imagem ocupa sempre a largura toda do ecrã, em qualquer tamanho —
          daí `100vw` e não um cálculo por breakpoint. Sem isto o browser
          assumia a largura da viewport na mesma, mas o `srcset` gerado ficava
          curto e um portátil recebia a variante errada.
        */
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: FUNDO.posicao }}
      />

      {/*
        A capa escura. A força está no `--veu-abertura`, em `globals.css` — é
        um número só, e é esse que se mexe para escurecer ou clarear.
      */}
      <div aria-hidden className="veu-abertura -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/*
          Três itens e não dois, e a razão é o telemóvel.

          Em coluna única a ordem natural — título, pesquisa, factos — punha o
          formulário logo a seguir à frase, e num ecrã estreito via-se uma
          frase e um formulário e mais nada. Separando a pesquisa do resto, ela
          desce para debaixo dos factos e o primeiro ecrã do telemóvel fica com
          a frase sobre a fotografia, que é o que se quer ver primeiro.

          Em `lg` a grelha volta a duas colunas: tudo à esquerda, e a metade
          direita deixada vazia de propósito para o carro da fotografia se ver.
        */}
        <div className="altura-abertura grid gap-y-8 pb-16 pt-28 lg:grid-cols-[minmax(0,54%)_1fr] lg:content-center lg:pb-24 lg:pt-32">
          <div className="order-1 min-w-0 lg:col-start-1">
            {/*
              O `h1` é esta frase, e é visível.

              Havia aqui dois títulos: um `h1` em `sr-only` com o nome do stand
              e a localidade, para os motores de busca, e um `<p>` com a frase
              grande, para as pessoas. Um documento com um título escondido e
              outro à vista é o mesmo documento a dizer duas coisas diferentes
              a dois leitores. A localidade não se perde — está na linha de
              factos aqui em baixo, no `<title>` da página e na secção da
              morada.
            */}
            <h1 className="font-display h-hero text-background">
              <span className="entrada-abertura block">Carros usados</span>
              {/*
                `--laranja-bright` e não o `--laranja-deep` do tema claro: o
                deep foi escolhido para ter contraste **sobre papel**, e sobre
                escuro apaga-se. O bright é o laranja que o sistema já usa em
                superfície escura, e é o par que o rodapé usa há muito.
              */}
              <span
                className="entrada-abertura block text-laranja-bright"
                style={{ animationDelay: "0.09s" }}
              >
                sem letra pequena.
              </span>
            </h1>

            {/*
              A linha de factos, que absorveu o rótulo `PERAFITA · MATOSINHOS`
              que estava em maiúsculas espaçadas por cima do título. Um rótulo
              desses diz menos do que uma frase que diga a mesma coisa a contar
              carros e preços, e poupa um elemento decorativo ao primeiro ecrã.

              Os dois números saem do inventário e mudam sozinhos quando o
              stock mudar.
            */}
            {/*
              Branco esbatido, e **não** o `--escuro-muted` que o rodapé usa
              para texto secundário sobre escuro.

              Esse token foi medido contra um fundo liso (`--escuro`, uma cor
              chapada). Aqui o fundo é uma fotografia com uma janela de luz, e
              o pixel mais claro por baixo desta linha é branco puro: contra
              ele o `--escuro-muted` dá 3,47:1 e não passa, por mais que se
              carregue no véu. Branco a 80% dá 5,71:1 no mesmo sítio.

              A hierarquia entre esta linha e o título continua a existir —
              faz-se pelo corpo (16 px contra 56) e não pelo tom.
            */}
            <p
              className="entrada-abertura mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-background/80"
              style={{ animationDelay: "0.2s" }}
            >
              <span>
                <strong className="font-display text-lg font-extrabold text-background">
                  {emStock.length}
                </strong>{" "}
                viaturas em stock
              </span>
              <span aria-hidden className="text-laranja">
                ◆
              </span>
              <span>
                desde{" "}
                <strong className="font-display text-lg font-extrabold text-background">
                  {formatarPreco(maisBarato)}
                </strong>
              </span>
              <span aria-hidden className="text-laranja">
                ◆
              </span>
              <span>Perafita, Matosinhos</span>
            </p>
          </div>

          {/* ── a pesquisa e as marcas ─────────────────────────────── */}
          <div className="order-2 min-w-0 lg:col-start-1">
            <div
              className="entrada-abertura"
              style={{ animationDelay: "0.3s" }}
            >
              <PesquisaRapida viaturas={emStock} />
            </div>

            <div
              className="entrada-abertura mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-background/15 pt-6"
              style={{ animationDelay: "0.38s" }}
            >
              <TiraMarcas viaturas={emStock} />
              <Link
                href={stand.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="press text-sm text-background/80 transition-colors hover:text-background"
              >
                Falar no WhatsApp ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
