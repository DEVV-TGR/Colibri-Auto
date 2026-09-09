import Image from "next/image";
import Link from "next/link";
import { urlViatura } from "@/lib/slug";
import type { Viatura } from "@/lib/types";

/*
  A montra: o stock inteiro a atravessar o ecrã.

  Duas filas em sentidos opostos e a velocidades diferentes, logo por baixo do
  título. É o que dá vida ao primeiro ecrã, e não é um efeito inventado — são
  as viaturas que estão à venda, com a lona laranja do stand no fundo de quase
  todas as fotografias. O laranja da página vem daí antes de vir do CSS.

  ## Sentidos opostos, e velocidades diferentes

  As duas filas não são decoração duplicada. Uma só fila lê-se como uma tira a
  passar; duas em sentidos contrários lêem-se como **profundidade** — o olho
  interpreta a mais rápida como estando mais perto. Daí os 50s e os 68s: se
  fossem iguais, o efeito desaparecia e ficavam duas tiras.

  ## Sem JavaScript

  É animação CSS, como era o rail que isto substitui, e por isso o componente
  fica no servidor. O `prefers-reduced-motion` trata-se em `globals.css`, onde
  a animação simplesmente não se aplica e as filas ficam paradas — continuam a
  ser sete fotografias de sete carros, que é informação, e não perdem nada por
  não andarem.

  A segunda cópia de cada fila leva `aria-hidden`: para um leitor de ecrã são
  as mesmas viaturas, e anunciá-las duas vezes seria mentira.
*/

const ALTURA = "h-40 sm:h-52";

function Tira({
  v,
  chave,
  duplicada,
  prioridade,
}: {
  v: Viatura;
  chave: string;
  duplicada: boolean;
  prioridade: boolean;
}) {
  return (
    <Link
      key={chave}
      href={urlViatura(v)}
      aria-hidden={duplicada || undefined}
      tabIndex={duplicada ? -1 : undefined}
      className={`group relative block ${ALTURA} w-60 shrink-0 overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-card sm:w-80`}
    >
      <Image
        src={v.fotos[0]}
        alt={duplicada ? "" : `${v.marca} ${v.modelo}`}
        fill
        sizes="320px"
        priority={prioridade}
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
          v.estadoVenda === "vendido" ? "opacity-60 saturate-50" : ""
        }`}
      />
      {/*
        O nome, sempre visível e não só em hover. No tema escuro o rail era
        cenário e o nome estorvava; aqui as fotografias assentam em papel, cada
        tira é um card a sério, e um card sem nome é uma imagem que não se sabe
        onde leva.
      */}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/85 to-transparent px-4 pb-2.5 pt-10 text-xs font-medium text-ink">
        {v.marca} {v.modelo}
      </span>
    </Link>
  );
}

export function MontraFundo({ viaturas }: { viaturas: Viatura[] }) {
  if (viaturas.length === 0) return null;

  /*
    A segunda fila arranca a meio da lista. Com as duas a começarem na mesma
    viatura, e a andarem em sentidos opostos, havia um instante em que as
    mesmas fotografias ficavam alinhadas na vertical — e via-se que era a
    mesma lista duas vezes.
  */
  const meio = Math.floor(viaturas.length / 2);
  const fila2 = [...viaturas.slice(meio), ...viaturas.slice(0, meio)];

  const fila = (lista: Viatura[], sufixo: string, prioridade: boolean) => (
    <>
      {lista.map((v, i) => (
        <Tira
          key={`${v.id}${sufixo}`}
          v={v}
          chave={`${v.id}${sufixo}`}
          duplicada={false}
          prioridade={prioridade && i < 3}
        />
      ))}
      {lista.map((v) => (
        <Tira
          key={`${v.id}${sufixo}-eco`}
          v={v}
          chave={`${v.id}${sufixo}-eco`}
          duplicada
          prioridade={false}
        />
      ))}
    </>
  );

  return (
    <section
      aria-label="Viaturas em stock"
      className="overflow-hidden bg-background py-4"
    >
      <div className="montra-fila montra-esquerda">{fila(viaturas, "-a", true)}</div>
      <div className="montra-fila montra-direita mt-4">{fila(fila2, "-b", false)}</div>
    </section>
  );
}
