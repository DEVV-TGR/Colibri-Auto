"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/car/Lightbox";
import { formatarKm, formatarPreco, formatarRegisto } from "@/lib/format";
import type { Viatura } from "@/lib/types";

/*
  A abertura da ficha de viatura.

  Antes a página começava por um percurso, um cabeçalho e só depois a galeria —
  dentro da coluna de conteúdo, a dois terços da largura. Numa listagem de
  carros isso é enterrar o que a pessoa veio ver: a fotografia é o produto, e
  estava do tamanho de um cartão.

  Aqui a fotografia **abre a página de margem a margem**, com o nome, a versão e
  o preço assentes por cima. O percurso passa a flutuar no topo da própria
  imagem, onde ocupa altura zero em vez de uma linha inteira antes de tudo.

  ## O tecto de altura, e porquê

  Seis das sete viaturas têm uma fotografia só, e três dessas foram recortadas
  do Instagram a 630px de largura. Uma abertura a `100svh` faria upscale de
  quatro vezes e via-se — a lona laranja do fundo ficaria uma mancha. Daí
  `clamp(320px, 56svh, 560px)`: grande o suficiente para ser a abertura,
  pequeno o suficiente para as fotografias que existem aguentarem.

  Quando o cliente der as originais, este tecto pode subir. Até lá, não.
*/
export function AberturaViatura({ viatura }: { viatura: Viatura }) {
  const [ativa, setAtiva] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduzido = useReducedMotion();
  const seccao = useRef<HTMLElement>(null);

  const vendido = viatura.estadoVenda === "vendido";
  const nome = `${viatura.marca} ${viatura.modelo}`;

  /*
    Parallax: a fotografia sobe metade do que a página desce, o que a faz
    parecer mais longe. `offset` de "start start" a "end start" mede só o
    troço em que a secção está a sair do ecrã — usar o `offset` por omissão
    fazia a imagem começar já deslocada em quem chega com a página a meio.
  */
  const { scrollYProgress } = useScroll({
    target: seccao,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      <section
        ref={seccao}
        className="relative overflow-hidden"
        style={{ height: "clamp(320px, 56svh, 560px)" }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduzido ? undefined : { y }}
        >
          <Image
            src={viatura.fotos[ativa]}
            alt={`${nome} — foto ${ativa + 1}`}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${vendido ? "opacity-60 saturate-50" : ""}`}
          />
        </motion.div>

        {/* Dois véus: um assenta o texto em baixo, o outro dá contraste ao percurso no topo. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
        />
        {/*
          O véu de cima é mais forte do que parece preciso, e a razão é a
          Mazda: é branca, ocupa o topo do enquadramento, e a `/80` que aqui
          estava deixava o percurso ilegível por cima dela. Estas fotografias
          não têm enquadramento combinado — são o que o stand tirou — e o véu
          tem de aguentar a mais clara delas.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/60 to-transparent"
        />

        {!vendido && (
          <p className="laranja-fill absolute right-4 top-20 z-10 rounded-full px-5 py-2.5 font-display text-xl font-medium text-background shadow-[0_2px_14px_-2px_rgba(0,0,0,0.6)] sm:right-8 sm:text-2xl">
            {formatarPreco(viatura.preco)}
          </p>
        )}

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6">
          <nav aria-label="Percurso" className="text-xs text-muted">
            <Link href="/viaturas" className="transition-colors hover:text-laranja-bright">
              Stock
            </Link>
            <span className="mx-2 text-laranja-deep">/</span>
            <Link
              href={`/viaturas?marca=${viatura.marcaSlug}`}
              className="transition-colors hover:text-laranja-bright"
            >
              {viatura.marca}
            </Link>
            <span className="mx-2 text-laranja-deep">/</span>
            <span className="text-creme">{viatura.modelo}</span>
          </nav>

          {/*
            O título ocupa a largura toda e o preço sobe para o canto da
            fotografia — não por composição, por medida: «Ford Focus SW 1.0
            EcoBoost S&S Titanium» a 52px enche a linha inteira, e a etiqueta
            ao lado era empurrada para baixo do título, encostada à esquerda,
            onde parecia um botão perdido.

            No canto superior direito fica onde o card da listagem já a põe, e
            a pessoa que clicou num card encontra-a onde a deixou.
          */}
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.15em] text-muted">
              <span>{formatarRegisto(viatura.registoMes, viatura.registoAno)}</span>
              <span className="text-laranja-deep">·</span>
              <span>{viatura.combustivel}</span>
              <span className="text-laranja-deep">·</span>
              <span>{formatarKm(viatura.quilometros)}</span>
            </p>
            <h1 className="mt-2 font-display h-section text-ink">
              {nome}{" "}
              <span className="font-extrabold text-laranja">{viatura.versao}</span>
            </h1>
          </div>
        </div>
      </section>

      {/*
        A tira de miniaturas, encostada por baixo da abertura. Escolhe a foto
        que a abertura mostra, e um segundo toque na mesma abre o lightbox — o
        gesto que já se espera de uma galeria.

        Com uma fotografia só não há tira nenhuma: uma miniatura sozinha do
        que já está em cima, em tamanho grande, é ruído a fingir de galeria.
        Fica só a ligação que abre o ecrã inteiro. É o caso de seis das sete
        viaturas — ver `docs/por-confirmar.md`.
      */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {viatura.fotos.length > 1 && (
        <div className="-mt-6 flex gap-2.5 overflow-x-auto pb-1">
          {viatura.fotos.map((f, i) => (
            <button
              key={f}
              type="button"
              onClick={() => (i === ativa ? setLightbox(true) : setAtiva(i))}
              aria-label={
                i === ativa ? `Abrir foto ${i + 1} em ecrã inteiro` : `Ver foto ${i + 1}`
              }
              className={`press relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border sm:w-28 ${
                i === ativa
                  ? "border-laranja"
                  : "border-line/60 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={f}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        )}

        <button
          type="button"
          onClick={() => setLightbox(true)}
          className={`press text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-laranja-bright ${
            viatura.fotos.length > 1 ? "mt-3" : "mt-5"
          }`}
        >
          {viatura.fotos.length}{" "}
          {viatura.fotos.length === 1 ? "fotografia" : "fotografias"} ⤢
        </button>
      </div>

      <Lightbox
        fotos={viatura.fotos}
        alt={nome}
        indice={ativa}
        aberto={lightbox}
        onFechar={() => setLightbox(false)}
        onNavegar={setAtiva}
      />
    </>
  );
}
