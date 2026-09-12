"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const MINIMO_MS = 1100; // tempo mínimo em ecrã, para a marca se ler
const LIMITE_MS = 3000; // rede de segurança: nunca deixar o ecrã preso
const LARGURA_PX = 200; // tamanho do logo em repouso
const ZOOM = 1.5; // zoom discreto, sempre sobre o preto

/**
 * Ecrã de abertura: papel opaco com o logótipo a crescer devagar.
 * Sai de uma vez (corte seco) — o fundo nunca se desvanece, para a homepage
 * não chegar a aparecer por baixo do logo.
 */
export function Preloader() {
  const [visivel, setVisivel] = useState(true);
  const reduzido = useReducedMotion();

  useEffect(() => {
    const inicio = performance.now();
    const temporizadores: number[] = [];
    let agendado = false;

    const sair = () => {
      if (agendado) return;
      agendado = true;
      const restante = Math.max(0, MINIMO_MS - (performance.now() - inicio));
      // saída comandada por temporizador, não pelo fim da animação
      temporizadores.push(window.setTimeout(() => setVisivel(false), restante));
    };

    if (document.readyState === "complete") sair();
    else window.addEventListener("load", sair);

    temporizadores.push(window.setTimeout(sair, LIMITE_MS));

    return () => {
      window.removeEventListener("load", sair);
      temporizadores.forEach(window.clearTimeout);
    };
  }, []);

  // trava o scroll enquanto o ecrã está visível
  useEffect(() => {
    if (!visivel) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [visivel]);

  if (!visivel) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      /*
        `preloader-rede` é o `LIMITE_MS` acima escrito em CSS, para a rede de
        segurança existir mesmo quando o JavaScript não corre — ver
        `globals.css`. Com o JavaScript a funcionar isto nunca chega a
        disparar: o componente desmonta-se muito antes.
      */
      className="preloader-rede fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background"
    >
      <motion.div
        style={{ width: LARGURA_PX }}
        initial={{ scale: 1 }}
        animate={{ scale: reduzido ? 1 : ZOOM }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          src="/logo/colibri-mark-md.png"
          alt=""
          width={420}
          height={420}
          priority
          className="h-auto w-full"
        />
      </motion.div>
      <span className="sr-only">A carregar</span>
    </div>
  );
}
