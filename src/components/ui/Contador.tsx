"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Número que anima suavemente quando o valor muda (ex.: contagem de resultados). */
export function Contador({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const anterior = useRef(valor);
  const reduzido = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduzido) {
      el.textContent = String(valor);
      anterior.current = valor;
      return;
    }
    const controlo = animate(anterior.current, valor, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    anterior.current = valor;
    return () => controlo.stop();
  }, [valor, reduzido]);

  return <span ref={ref}>{valor}</span>;
}
