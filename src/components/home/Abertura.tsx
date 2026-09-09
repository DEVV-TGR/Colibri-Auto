"use client";

import { motion, useReducedMotion } from "motion/react";
import { ENTRADA } from "@/components/ui/Reveal";
import { BotaoLink } from "@/components/ui/Botao";
import { stand } from "@/data/stand";
import { SITE_NAME } from "@/lib/site";

/*
  A abertura da home.

  **Sem fotografia de fundo, e é essa a decisão.** O sistema de onde este site
  veio abria com o showroom em ecrã inteiro por baixo de dois véus escuros —
  funciona quando o espaço é o argumento de venda. O da Colibri é um terreno de
  relva sintética com uma lona laranja atrás: é honesto, aparece em todas as
  fotografias do inventário, e não aguenta ser ampliado a 92vh por trás de
  texto.

  O que a Colibri tem para pôr em grande não é um espaço, é uma frase. Por
  isso a abertura é tipográfica, sobre o antracite da marca, e a montra entra
  logo a seguir no `RailStock` — em movimento e ao tamanho certo.

  O statement entra linha a linha por baixo de uma máscara. É o único sítio do
  site com este gesto; passar a segunda linha a seguir à primeira é o que faz a
  frase ler-se como fala e não como um bloco que apareceu.
*/

const LINHAS = ["Carros usados", "sem letra pequena."] as const;

const PROMESSAS = [
  "Garantia incluída no preço",
  "Financiamento",
  "Aceitamos retoma",
] as const;

export function Abertura() {
  const reduzido = useReducedMotion();

  /*
    Cada linha é uma caixa com `overflow-hidden` e o texto sobe de baixo. Com
    movimento reduzido não há máscara nem deslocamento nenhum — devolve-se
    `false` ao `initial`, que é o que diz ao motion para desenhar já no estado
    final em vez de animar até lá.

    **`whileInView` e não `animate`, apesar de isto estar sempre à vista.** É o
    padrão único de entrada do projecto (`docs/brand/06`), e não vale a pena
    abrir uma excepção para a única coisa que aparece sem se fazer scroll:
    estando a abertura no topo, o `IntersectionObserver` resolve no primeiro
    fotograma e o resultado é indistinguível de uma animação de montagem.

    Tem uma vantagem concreta sobre o `animate`: com `once: true`, se o
    JavaScript demorar ou falhar, o texto fica no estado final em vez de ficar
    preso fora da máscara. Um hero que não aparece é pior do que um hero que
    não anima.
  */
  const linha = (i: number) => ({
    initial: reduzido ? false : { y: "110%" },
    whileInView: { y: "0%" },
    viewport: { once: true },
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: ENTRADA },
  });

  return (
    <section className="relative overflow-hidden border-b border-line/60 bg-background">
      {/*
        Um halo laranja muito esbatido atrás do texto, à esquerda. Faz o fundo
        deixar de ser uma chapa de cor e dá profundidade sem introduzir imagem
        nenhuma. `blur-[120px]` e opacidade baixa: se se vir como um círculo,
        está errado.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[620px] rounded-full bg-laranja/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40">
        {/*
          O H1 real, para leitores de ecrã e para o Google: diz o negócio, a
          categoria e a localidade. O statement visível é uma frase de marca e
          não diz nenhuma das três — fica em <p>, sem perder peso visual.
        */}
        <h1 className="sr-only">
          {SITE_NAME} — stand de carros usados em Perafita, Matosinhos
        </h1>

        <motion.p
          initial={reduzido ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ENTRADA }}
          className="text-xs uppercase tracking-[0.3em] text-laranja"
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

        <motion.div
          initial={reduzido ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: ENTRADA }}
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted"
        >
          {PROMESSAS.map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-laranja-deep">
                  ·
                </span>
              )}
              {p}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={reduzido ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.62, ease: ENTRADA }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <BotaoLink href="/viaturas">Ver o stock</BotaoLink>
          <BotaoLink href={stand.whatsapp} variante="contorno" target="_blank" rel="noreferrer">
            Falar no WhatsApp ↗
          </BotaoLink>
        </motion.div>
      </div>
    </section>
  );
}
