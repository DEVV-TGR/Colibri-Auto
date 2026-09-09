"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { urlViatura } from "@/lib/slug";
import type { Viatura } from "@/lib/types";

/*
  A montra a passar.

  Uma tira de margem a margem com a capa de cada viatura, a correr devagar da
  direita para a esquerda. É a fotografia que a abertura não tem, e é o único
  sítio do site onde o stock inteiro aparece de uma vez.

  **É cenário, não é o carrossel.** Esta distinção é a razão de o rail existir
  sem repetir os «Destaques» que vêm logo a seguir, e mantém-se assim:

  - Aqui só há fotografia. Sem preço, sem quilómetros, sem versão. O nome só
    aparece em hover, e serve para saber onde se vai clicar.
  - Não tem controlos. Corre sozinho e pára quando o rato entra.
  - As tiras são baixas e cortam nas margens do ecrã; os cards dos destaques
    são grandes e vivem dentro do container.

  Se alguma vez isto ganhar um preço ou uma seta, passa a ser um segundo
  carrossel — e aí um dos dois está a mais.

  ## Como a emenda não se vê

  A animação desloca a fila em -50%. Para isso não dar um salto no fim, a fila
  é a lista duplicada: quando a primeira cópia acaba de sair, a segunda está
  exactamente onde a primeira começou. Daí o `aria-hidden` na segunda metade —
  para um leitor de ecrã são as mesmas viaturas e anunciá-las duas vezes seria
  mentira.
*/

const DURACAO_S = 44;

export function RailStock({ viaturas }: { viaturas: Viatura[] }) {
  const reduzido = useReducedMotion();

  if (viaturas.length === 0) return null;

  const tira = (v: Viatura, chave: string, duplicada: boolean) => (
    <Link
      key={chave}
      href={urlViatura(v)}
      aria-hidden={duplicada || undefined}
      tabIndex={duplicada ? -1 : undefined}
      className="group relative block h-32 w-52 shrink-0 overflow-hidden rounded-xl border border-line/60 sm:h-40 sm:w-64"
    >
      <Image
        src={v.fotos[0]}
        alt={duplicada ? "" : `${v.marca} ${v.modelo}`}
        fill
        sizes="256px"
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
          v.estadoVenda === "vendido" ? "opacity-50 saturate-50" : ""
        }`}
      />
      {/* O nome, só em hover — e sobre um degradê, porque estas fotografias têm relva clara em baixo e texto branco sobre relva não se lê. */}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-3 pb-2 pt-8 text-xs text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {v.marca} {v.modelo}
      </span>
    </Link>
  );

  /*
    Com movimento reduzido não há marquee nenhum: fica uma fila que se percorre
    à mão, sem duplicados. A anulação de animações do `globals.css` só apanha
    CSS, e isto é uma animação CSS — mas a duplicação da lista não é, e deixar
    lá o dobro das viaturas paradas era um erro de conteúdo, não de movimento.
  */
  if (reduzido) {
    return (
      <section aria-label="Viaturas em stock" className="border-b border-line/60 bg-surface/40 py-6">
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6">
          {viaturas.map((v) => tira(v, v.id, false))}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Viaturas em stock"
      className="group/rail relative overflow-hidden border-b border-line/60 bg-surface/40 py-6"
    >
      {/* Esbatimento nas pontas, para as tiras entrarem e saírem em vez de serem cortadas a direito. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
      />

      <div
        className="rail-fila group-hover/rail:[animation-play-state:paused]"
        style={{ "--rail-duracao": `${DURACAO_S}s` } as React.CSSProperties}
      >
        {viaturas.map((v) => tira(v, v.id, false))}
        {viaturas.map((v) => tira(v, `${v.id}-eco`, true))}
      </div>
    </section>
  );
}
