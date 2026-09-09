"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BadgeEstado } from "@/components/car/BadgeEstado";
import {
  formatarKm,
  formatarPreco,
  formatarRegisto,
} from "@/lib/format";
import { urlViatura } from "@/lib/slug";
import type { Viatura } from "@/lib/types";

export function CarCard({
  viatura,
  prioridade = false,
}: {
  viatura: Viatura;
  prioridade?: boolean;
}) {
  const total = viatura.fotos.length;
  /*
    A capa é a primeira foto — a que estiver em primeiro lugar no painel.

    Isto abria na segunda (índice 1) por uma razão que deixou de existir: as
    fotos vinham dos anúncios do StandVirtual, onde a primeira é sempre o mesmo
    ângulo de frente, e saltá-la dava variedade à grelha. Agora que a ordem se
    escolhe no painel, esse truque passa a contrariar quem a escolheu — quem
    põe uma foto em primeiro lugar espera vê-la na capa.
  */
  const inicial = 0;
  const [foto, setFoto] = useState(inicial);
  const vendido = viatura.estadoVenda === "vendido";

  const mudar = (delta: number) => {
    setFoto((f) => (f + delta + total) % total);
  };

  // arrasto/deslize horizontal para mudar de foto (além das setas)
  const inicioX = useRef(0);
  const moveu = useRef(false);
  const ativoPonteiro = useRef(false);
  const capturado = useRef(false);
  const LIMIAR_MOVE = 6; // px acima do qual é arrasto (e não clique)
  const LIMIAR_SWIPE = 40; // px para trocar de foto

  const onPointerDown = (e: React.PointerEvent) => {
    if (total <= 1) return;
    ativoPonteiro.current = true;
    moveu.current = false;
    capturado.current = false;
    inicioX.current = e.clientX;
    /*
      Sem `setPointerCapture` já: capturar o ponteiro aqui redirecionava o
      `pointerup` para esta caixa, e o browser deixava de gerar o `click` nas
      setas lá dentro — carregar em ‹ › não passava a foto. A captura só é
      precisa quando isto passa mesmo a ser um arrasto, e é aí que se faz.
    */
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!ativoPonteiro.current) return;
    if (Math.abs(e.clientX - inicioX.current) <= LIMIAR_MOVE) return;
    moveu.current = true;
    // a partir daqui é arrasto: agarra o ponteiro para o dedo poder sair da
    // caixa sem se perder o fim do gesto
    if (!capturado.current) {
      capturado.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };
  const terminarArrasto = (e: React.PointerEvent) => {
    if (!ativoPonteiro.current) return;
    ativoPonteiro.current = false;
    capturado.current = false;
    const dx = e.clientX - inicioX.current;
    if (Math.abs(dx) > LIMIAR_SWIPE) mudar(dx < 0 ? 1 : -1);
  };

  return (
    /*
      O card levanta ao passar o rato. É um `translate-y` de 4px e mais nada —
      sem sombra a crescer, porque a regra do sistema é que só o que flutua
      sobre outro conteúdo leva sombra, e um card de uma grelha não flutua.
    */
    <article className="press group relative overflow-hidden rounded-2xl border border-line/60 bg-surface transition-colors duration-300 hover:-translate-y-1 hover:border-laranja/50">
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
          total > 1 ? "cursor-grab touch-pan-y select-none active:cursor-grabbing" : ""
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={terminarArrasto}
        onPointerCancel={terminarArrasto}
      >
        <BadgeEstado viatura={viatura} />

        {/*
          O preço, numa etiqueta sobre a fotografia.

          Não é uma escolha de layout — é o idioma da própria Colibri. Todas as
          publicações deles no Instagram levam o preço numa etiqueta no canto
          da foto, e é assim que quem os segue está habituado a ler o stock.
          Reconhecer isso é metade do que faz o site parecer deles.

          Uma vendida não leva etiqueta nenhuma: o preço deixou de ser uma
          proposta, e mantê-lo à vista seria anunciar o que já não se vende. O
          badge de estado, esse, continua no canto oposto.
        */}
        {!vendido && (
          <p className="laranja-fill absolute right-3 top-3 z-10 rounded-full px-3.5 py-1.5 font-display text-sm font-medium text-background shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)]">
            {formatarPreco(viatura.preco)}
          </p>
        )}
        <Link
          href={urlViatura(viatura)}
          tabIndex={-1}
          aria-hidden
          draggable={false}
          onClickCapture={(e) => {
            if (moveu.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <Image
            src={viatura.fotos[foto]}
            alt={`${viatura.marca} ${viatura.modelo} — foto ${foto + 1}`}
            fill
            draggable={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={prioridade && foto === inicial}
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              vendido ? "opacity-60 saturate-50" : ""
            }`}
          />
        </Link>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => mudar(-1)}
              className="press absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-ink backdrop-blur hover:bg-background/85 focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Foto seguinte"
              onClick={() => mudar(1)}
              className="press absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-ink backdrop-blur hover:bg-background/85 focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {viatura.fotos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-4 rounded-full transition-colors duration-200 ${
                    i === foto ? "bg-laranja" : "bg-ink/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/*
        O corpo do card, agora sem o preço — subiu para a fotografia. Isso
        liberta o pé para o que sobra: o nome primeiro e grande, a versão a
        seguir, e a linha de meta em baixo a fechar. No sistema de origem a
        ordem era a inversa (meta, nome, versão, preço), e o card acabava num
        número em vez de acabar numa acção.
      */}
      <Link href={urlViatura(viatura)} className="block p-5">
        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-laranja-bright">
          {viatura.marca} {viatura.modelo}
        </h3>
        <p className="mt-0.5 truncate text-sm text-muted">{viatura.versao}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/50 pt-4">
          <p className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.15em] text-muted">
            <span>{formatarRegisto(viatura.registoMes, viatura.registoAno)}</span>
            <span className="text-laranja-deep">·</span>
            <span>{viatura.combustivel}</span>
            <span className="text-laranja-deep">·</span>
            <span>{formatarKm(viatura.quilometros)}</span>
          </p>
          {/*
            A seta é a única coisa que se move no pé. Está sempre visível — em
            telemóvel não há hover, e um afluente que só aparece com rato é um
            afluente que metade das pessoas nunca vê.
          */}
          <span
            aria-hidden
            className="shrink-0 text-laranja transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>

        {vendido && (
          <p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
            Vendida
          </p>
        )}
      </Link>
    </article>
  );
}
