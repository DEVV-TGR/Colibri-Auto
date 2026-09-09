"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { ENTRADA } from "@/components/ui/Reveal";
import { useEffect, useRef } from "react";

/*
  Um número que conta de zero até ao valor, uma vez, quando entra no ecrã.

  Não é o `Contador`, e os dois não se substituem. O `Contador` anima **entre
  valores** e serve a contagem viva da pesquisa, onde o número muda a cada
  escolha de filtro. Este anima **de zero até um valor fixo**, dispara por
  scroll e nunca mais volta a correr.

  O `once: true` do `useInView` é obrigatório pela mesma razão que no `Reveal`:
  um número que volta a contar sempre que se passa por ele faz o site parecer
  instável, e a segunda vez já ninguém está a olhar.
*/
export function NumeroEmScroll({
  valor,
  duracao = 1.1,
}: {
  valor: number;
  duracao?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const noEcra = useInView(ref, { once: true, margin: "-80px" });
  const reduzido = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !noEcra) return;

    /*
      Contar exige que a página esteja visível. Num separador em segundo plano
      o browser não corre `requestAnimationFrame`, a animação não avança, e o
      número fica **parado no zero** — que é o pior sítio onde parar, porque
      "0 viaturas em stock" é uma frase que se lê e se acredita. Quem chega a
      um separador aberto há bocado apanhava exactamente isso.
    */
    if (reduzido || document.hidden) {
      el.textContent = String(valor);
      return;
    }

    const controlo = animate(0, valor, {
      duration: duracao,
      ease: ENTRADA,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });

    /*
      O valor final escrito à mão no fim, e outra vez se a animação for
      interrompida. O `onUpdate` chega ao alvo por arredondamento e não por
      igualdade, e uma paragem a meio deixava o número no que lá estivesse.
    */
    const fixar = () => {
      el.textContent = String(valor);
    };
    controlo.then(fixar, fixar);

    return () => {
      controlo.stop();
      fixar();
    };
  }, [noEcra, valor, duracao, reduzido]);

  /*
    O valor final fica no HTML servido, e só é substituído quando a animação
    arranca. Sem isto, quem tem JavaScript desligado — ou quem chega antes de o
    componente hidratar — vê um espaço em branco onde devia estar o número.
  */
  return <span ref={ref}>{valor}</span>;
}
