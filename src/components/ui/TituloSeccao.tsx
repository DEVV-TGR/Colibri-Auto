"use client";

import { motion, useReducedMotion } from "motion/react";
import { ENTRADA } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

/*
  A marca de secção do site.

  O sistema de onde este projecto veio abria cada secção com um *eyebrow* —
  duas ou três palavras em maiúsculas muito espaçadas, por cima do título. É
  um recurso editorial, e num stand premium fazia sentido: dizia "revista", e
  a revista era o argumento.

  Aqui a secção passa a ser **numerada**, com uma régua a atravessar até ao
  rótulo. É como um stand arruma o que tem — 01, 02, 03 — e é uma marca que se
  reconhece de relance, ao contrário do eyebrow, que se lê como texto pequeno
  e desaparece.

  A régua desenha-se da esquerda para a direita ao entrar no ecrã. É o único
  sítio do site onde uma linha se anima, e é isso que a torna a assinatura em
  vez de decoração.
*/
export function TituloSeccao({
  numero,
  rotulo,
  titulo,
  children,
  accao,
}: {
  /** "01", "02"… Escrito à mão e não derivado da ordem: as secções mudam de sítio e o número tem de continuar a ser o mesmo sítio na conversa. */
  numero: string;
  /** O rótulo curto ao fim da régua, em maiúsculas. */
  rotulo: string;
  /** O heading. Vem como nó para poder levar a última palavra a `font-extrabold text-laranja`. */
  titulo: ReactNode;
  /** Subtítulo opcional. */
  children?: ReactNode;
  /** Ligação opcional à direita, alinhada com o heading. */
  accao?: ReactNode;
}) {
  const reduzido = useReducedMotion();

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-laranja">{numero}</span>
        {/*
          A régua. `origin-left` com `scaleX` e não uma largura a animar —
          transformar não obriga o browser a recalcular a disposição da página
          a cada fotograma, e uma largura obriga.
        */}
        <motion.span
          aria-hidden
          className="h-px flex-1 origin-left bg-gradient-to-r from-laranja-deep to-laranja/20"
          initial={reduzido ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: ENTRADA }}
        />
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {rotulo}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="min-w-0">
          <h2 className="font-display h-section text-ink">{titulo}</h2>
          {children && (
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              {children}
            </p>
          )}
        </div>
        {accao}
      </div>
    </div>
  );
}
