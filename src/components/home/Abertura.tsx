"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ENTRADA } from "@/components/ui/Reveal";
import { BotaoLink } from "@/components/ui/Botao";
import { NumeroEmScroll } from "@/components/ui/NumeroEmScroll";
import { stand } from "@/data/stand";
import { getDestaques } from "@/lib/derivados";
import { formatarPreco } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";
import { urlViatura } from "@/lib/slug";
import type { Viatura } from "@/lib/types";

/*
  A abertura da home.

  **A lona ocupa metade do primeiro ecrã, e é uma fotografia e não um painel.**

  As versões anteriores tentaram impacto por movimento — filas de miniaturas a
  deslizar — e a resposta do cliente foi que não gostava nada delas. Tinha
  razão, e o erro tem nome: pôr *actividade* onde faltava *presença*. Ninguém
  compra um carro a olhar para uma tira de 200px a passar.

  O stand tem uma coisa que nenhum efeito substitui: uma lona laranja de seis
  metros com um carro à frente. É o que se vê ao passar na avenida, e está
  fotografado — a 1600px, com o nome e o selo legíveis. Estava a ser usada como
  miniatura de uma galeria.

  Daí também o laranja em massa vir da **fotografia** e não do CSS. Um painel
  laranja ao lado desta imagem punha dois laranjas e dois wordmarks a competir
  no mesmo ecrã.

  O cartão sobre a fotografia não é decoração: liga à ficha, e faz do primeiro
  ecrã um sítio de onde se sai para um carro concreto.
*/

const LINHAS = ["Carros usados", "sem letra pequena."] as const;

/**
 * A viatura da abertura: de entre os destaques, a que tem mais fotografias.
 *
 * Escolhida pelos dados e não escrita à mão, por uma razão prática — hoje só o
 * Ford Focus tem um álbum a sério (19 fotografias do Standvirtual); as outras
 * têm uma cada, recortada do Instagram a 630px. No dia em que o Ford se vender,
 * uma escolha fixa deixava meia página com uma fotografia esticada quatro
 * vezes. Assim, a abertura acompanha sempre o melhor material que houver.
 */
function viaturaDaAbertura(viaturas: Viatura[]): Viatura | undefined {
  return [...getDestaques(viaturas)].sort(
    (a, b) => b.fotos.length - a.fotos.length,
  )[0];
}

export function Abertura({ viaturas }: { viaturas: Viatura[] }) {
  const reduzido = useReducedMotion();

  const disponiveis = viaturas.filter((v) => v.estadoVenda !== "vendido");
  const emStock = disponiveis.length;

  /*
    O preço mais baixo é o mínimo real e **não** o `getIntervalos().preco[0]`.
    Esse arredonda para fora, ao milhar, para dar limites redondos aos sliders
    dos filtros — o que ali é certo e aqui era uma mentira: com a viatura mais
    barata a 4 999 €, a abertura anunciava "desde 4 000 €" e não havia nenhum
    carro por esse preço.
  */
  const maisBarato = Math.min(...disponiveis.map((v) => v.preco));
  const destaque = viaturaDaAbertura(viaturas);

  /*
    Cada linha do título é uma caixa com `overflow-hidden` e o texto sobe de
    baixo. Com movimento reduzido não há máscara nem deslocamento.

    `whileInView` e não `animate`, apesar de isto estar sempre à vista: é o
    padrão único de entrada do projecto (`docs/brand/06`), o
    `IntersectionObserver` resolve no primeiro fotograma, e se o JavaScript
    demorar ou falhar o texto fica no estado final em vez de preso fora da
    máscara. Um hero que não aparece é pior do que um hero que não anima.
  */
  const linha = (i: number) => ({
    initial: reduzido ? false : { y: "110%" },
    whileInView: { y: "0%" },
    viewport: { once: true },
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: ENTRADA },
  });

  return (
    /*
      **62svh e não 78, e a razão é a fotografia.**

      A lona é uma imagem de 1600×1111, ou seja 1.44 de proporção. Metade de um
      ecrã com 78svh de altura dá um painel a 1.19, e o `object-cover` resolve
      essa diferença cortando 17% da largura — o que na prática cortava a
      traseira do carro. Medido, não estimado.

      A 62svh o painel fica a ~1.34 e a viatura cabe inteira. O primeiro ecrã
      não perde nada: o que se ganha em altura vazia perde-se em carro, e por
      baixo entram a faixa laranja e a barra de pesquisa, que enchem o resto.

      Se um dia houver fotografias mais largas, esta altura pode subir. É a
      imagem que manda na altura, não o contrário.
    */
    <section className="relative bg-background lg:min-h-[62svh]">
      <div className="lg:grid lg:min-h-[62svh] lg:grid-cols-[minmax(0,52%)_1fr]">
        {/* ── texto ─────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-center px-4 pb-14 pt-32 sm:px-6 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))] lg:pr-12">
          <h1 className="sr-only">
            {SITE_NAME} — stand de carros usados em Perafita, Matosinhos
          </h1>

          <motion.p
            initial={reduzido ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ENTRADA }}
            className="text-xs uppercase tracking-[0.3em] text-laranja-deep"
          >
            Perafita · Matosinhos
          </motion.p>

          <p className="mt-6 font-display h-hero text-ink">
            {LINHAS.map((texto, i) => (
              <span key={texto} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  {...linha(i)}
                  className={`block ${i === 1 ? "text-laranja-metal" : ""}`}
                >
                  {texto}
                </motion.span>
              </span>
            ))}
          </p>

          {/*
            A linha de factos. Números e não promessas — «garantia incluída ·
            financiamento · retoma» está na faixa laranja logo a seguir, com
            seis vezes o tamanho. Os dois números saem do inventário e mudam
            sozinhos quando o stock mudar.
          */}
          <motion.div
            initial={reduzido ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: ENTRADA }}
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-muted"
          >
            <span>
              <strong className="font-display text-xl font-extrabold text-ink">
                <NumeroEmScroll valor={emStock} />
              </strong>{" "}
              viaturas em stock
            </span>
            <span aria-hidden className="text-laranja">
              ◆
            </span>
            <span>
              desde{" "}
              <strong className="font-display text-xl font-extrabold text-ink">
                {formatarPreco(maisBarato)}
              </strong>
            </span>
          </motion.div>

          <motion.div
            initial={reduzido ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.58, ease: ENTRADA }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <BotaoLink href="/viaturas">Ver o stock</BotaoLink>
            <BotaoLink
              href={stand.whatsapp}
              variante="contorno"
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp ↗
            </BotaoLink>
          </motion.div>
        </div>

        {/* ── a lona ────────────────────────────────────────────────── */}
        {destaque && (
          <div className="relative h-[62svh] min-h-[320px] lg:h-auto">
            <Image
              src={destaque.fotos[0]}
              alt={`${destaque.marca} ${destaque.modelo} à porta do stand`}
              fill
              priority
              /*
                A fotografia é o maior elemento da página e o LCP. O `sizes`
                diz ao browser que num telemóvel ela ocupa a largura toda mas
                em desktop pouco mais de metade — sem isto ia buscar a variante
                de 1600px a um ecrã de 390.
              */
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />

            {/*
              Um véu curto só do lado esquerdo, e só a partir de `lg`. Serve a
              costura entre a fotografia e o papel: sem ele há uma linha dura a
              meio do ecrã. Não escurece a imagem — funde-a com o fundo.
            */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-background to-transparent lg:block"
            />

            <motion.div
              initial={reduzido ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7, ease: ENTRADA }}
              className="absolute bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs"
            >
              <Link
                href={urlViatura(destaque)}
                className="press group flex items-center gap-4 rounded-2xl border border-line/60 bg-surface/95 p-4 shadow-alta backdrop-blur-xl transition-colors hover:border-laranja"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-[0.2em] text-laranja-deep">
                    Em destaque
                  </span>
                  <span className="mt-1 block truncate font-display text-lg text-ink">
                    {destaque.marca} {destaque.modelo}
                  </span>
                  <span className="block text-sm text-muted">
                    {formatarPreco(destaque.preco)}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-laranja-deep transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
