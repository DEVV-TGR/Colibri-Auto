"use client";

import { motion, useReducedMotion } from "motion/react";
import { ENTRADA } from "@/components/ui/Reveal";
import { BotaoLink } from "@/components/ui/Botao";
import { NumeroEmScroll } from "@/components/ui/NumeroEmScroll";
import { stand } from "@/data/stand";
import { formatarPreco } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";
import type { Viatura } from "@/lib/types";

/*
  A abertura da home.

  **O texto não vai por cima das fotografias, e é uma decisão do tema claro.**
  Antracite sobre uma fotografia atarefada — relva verde, lona laranja, um
  carro — não se lê, e a alternativa seria escurecer a fotografia com um véu,
  ou seja, voltar ao tema escuro por outra porta.

  Fica em três andares, e cada um faz uma coisa:

      papel   ·  a frase, os factos e os botões
      montra  ·  as viaturas a atravessar o ecrã
      lona    ·  a faixa laranja

  Quem abre o site apanha os três de uma vez: tipografia grande sobre papel,
  carros reais em movimento, e uma parede laranja. Nenhum é um efeito
  inventado — são a frase do stand, o stock do stand e a lona do stand.

  O statement entra linha a linha por baixo de uma máscara. É o único sítio do
  site com este gesto; passar a segunda linha a seguir à primeira faz a frase
  ler-se como fala e não como um bloco que apareceu.
*/

const LINHAS = ["Carros usados", "sem letra pequena."] as const;

export function Abertura({ viaturas }: { viaturas: Viatura[] }) {
  const reduzido = useReducedMotion();

  const disponiveis = viaturas.filter((v) => v.estadoVenda !== "vendido");
  const emStock = disponiveis.length;

  /*
    O preço mais baixo é o mínimo real e **não** o `getIntervalos().preco[0]`.

    O `getIntervalos` arredonda para fora, ao milhar, para dar limites redondos
    aos sliders dos filtros — o que ali é certo e aqui era uma mentira: com a
    viatura mais barata a 4 999 €, a abertura anunciava "desde 4 000 €" e não
    havia nenhum carro por esse preço. Num sítio onde se diz um número a quem
    acabou de chegar, o número tem de ser um carro que existe.
  */
  const maisBarato = Math.min(...disponiveis.map((v) => v.preco));

  /*
    Cada linha é uma caixa com `overflow-hidden` e o texto sobe de baixo. Com
    movimento reduzido não há máscara nem deslocamento — devolve-se `false` ao
    `initial`, que é o que diz ao motion para desenhar já no estado final.

    **`whileInView` e não `animate`, apesar de isto estar sempre à vista.** É o
    padrão único de entrada do projecto (`docs/brand/06`), e estando a abertura
    no topo o `IntersectionObserver` resolve no primeiro fotograma. Tem ainda a
    vantagem de, se o JavaScript demorar ou falhar, o texto ficar no estado
    final em vez de preso fora da máscara: um hero que não aparece é pior do
    que um hero que não anima.
  */
  const linha = (i: number) => ({
    initial: reduzido ? false : { y: "110%" },
    whileInView: { y: "0%" },
    viewport: { once: true },
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: ENTRADA },
  });

  return (
    <section className="relative overflow-hidden bg-background">
      {/*
        Uma lavagem laranja muito esbatida em cima à direita, a apanhar o canto
        que o texto deixa vazio. Sobre papel funciona ao contrário do halo que
        aqui estava para o fundo escuro: em vez de dar profundidade a um vazio,
        aquece a folha. Se se vir como um círculo, está errado.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[560px] w-[720px] rounded-full bg-laranja/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-40">
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
          A linha de factos, no lugar da linha de promessas que aqui estava.

          «Garantia incluída · Financiamento · Retoma» mudou-se para a faixa
          laranja logo a seguir, onde tem seis vezes o tamanho. O que fica aqui
          são números — quantos carros há e por quanto começam —, que é o que
          alguém quer saber no segundo em que aterra e o que uma promessa não
          responde. Saem os dois do inventário: mudam sozinhos quando o stock
          mudar.
        */}
        <motion.div
          initial={reduzido ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45, ease: ENTRADA }}
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-muted"
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
          <span aria-hidden className="text-laranja">
            ◆
          </span>
          <span>garantia incluída</span>
        </motion.div>

        <motion.div
          initial={reduzido ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.58, ease: ENTRADA }}
          className="mt-10 flex flex-wrap gap-3"
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
    </section>
  );
}
