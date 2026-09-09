"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/*
  O easing de todas as entradas do projecto — um ease-out expo.

  Estava escrito à mão aqui e repetido no `Lightbox`. Passa a ser exportado
  porque a home nova tem seis sítios a animar entradas, e seis cópias de
  `[0.22, 1, 0.36, 1]` são seis oportunidades de uma delas divergir sem
  ninguém dar por isso.

  O `as const` não é cosmético: sem ele o TypeScript vê `number[]` e o motion
  exige a tupla de quatro, porque uma curva de Bézier com três números não é
  uma curva.
*/
export const ENTRADA = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduzido = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduzido ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: ENTRADA }}
    >
      {children}
    </motion.div>
  );
}
