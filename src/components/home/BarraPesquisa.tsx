"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Contador } from "@/components/ui/Contador";
import { getCombustiveis, getIntervalos, getMarcas } from "@/lib/derivados";
import { filtrarViaturas, serializeFiltros } from "@/lib/filtros";
import { logoMarca } from "@/lib/marcas";
import { urlViaturasPorMarca } from "@/lib/slug";
import type { Combustivel, Viatura } from "@/lib/types";

/*
  A pesquisa rápida e a tira de marcas.

  Eram uma banda de largura total encostada por baixo da abertura. Passam a ser
  **duas peças sem invólucro**, compostas dentro do primeiro ecrã — é onde uma
  pessoa que chega a um stand quer filtrar, e é o que o site que serviu de
  referência faz: a pergunta e os campos ao lado da montra, não depois dela.

  A lógica não mudou nada nesta passagem: os mesmos três campos, os mesmos
  helpers (`filtrarViaturas`, `serializeFiltros`), o mesmo contador a somar
  enquanto se escolhe. O que saiu foi o `<section>` com fundo próprio: dentro
  de uma abertura que já é uma fotografia de ecrã inteiro, uma segunda banda
  com chão próprio era uma camada a mais.

  Três campos e não quatro. Marca, combustível e tecto de preço são as três
  perguntas que alguém faz de pé à porta de um stand; modelo, ano, caixa e
  quilómetros são para quem já está a comparar, e esses vivem em `/viaturas`.
*/

/*
  Os campos são brancos sobre o cartão de papel, e não o contrário.

  Enquanto isto vivia numa banda branca, os campos levavam o papel para se
  distinguirem do fundo. Dentro da abertura a relação inverte-se — o cartão é
  uma ilha de papel sobre uma fotografia escurecida — e os campos têm de ser a
  superfície mais clara, senão desaparecem dentro dele.
*/
const campoClasses =
  "w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 pr-10 text-sm text-ink outline-none transition-colors focus:border-laranja [&>option]:bg-surface";

function Campo({
  rotulo,
  children,
}: {
  rotulo: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted">
        {rotulo}
      </span>
      <span className="relative block">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-laranja-deep"
        >
          ▾
        </span>
      </span>
    </label>
  );
}

/**
 * Degraus do tecto de preço, arredondados a partir do intervalo real do
 * inventário. Não são fixos no código: com um stock entre 5 e 17 mil euros,
 * uma lista que fosse até aos 50 mil daria cinco opções mortas.
 */
function degrausDePreco(max: number): number[] {
  const passo = 2500;
  const topo = Math.ceil(max / passo) * passo;
  const degraus: number[] = [];
  for (let v = passo * 2; v < topo; v += passo) degraus.push(v);
  return degraus;
}

export function PesquisaRapida({ viaturas }: { viaturas: Viatura[] }) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const marcas = useMemo(() => getMarcas(viaturas), [viaturas]);
  const combustiveis = useMemo(() => getCombustiveis(viaturas), [viaturas]);
  const degraus = useMemo(
    () => degrausDePreco(getIntervalos(viaturas).preco[1]),
    [viaturas],
  );

  const filtros = {
    marca: marca || undefined,
    combustivel: (combustivel || undefined) as Combustivel | undefined,
    precoMax: precoMax ? Number(precoMax) : undefined,
  };
  const resultados = filtrarViaturas(viaturas, filtros).length;

  const pesquisar = () => {
    const qs = serializeFiltros(filtros);
    router.push(qs ? `/viaturas?${qs}` : "/viaturas");
  };

  return (
    /*
      Cartão de papel sólido, e não vidro fosco.

      Sobre uma fotografia, a tentação é um cartão translúcido com
      `backdrop-blur`. Aqui seria decoração a pagar-se com legibilidade: os
      `<select>` são o conteúdo mais denso do primeiro ecrã e têm de se ler
      sem esforço, e por trás deles passa uma imagem com carro, betão e uma
      janela de luz. Papel opaco resolve isso e destaca-se do escuro sozinho —
      sem sombra, que num fundo escuro não faria diferença nenhuma.
    */
    <form
      role="search"
      aria-label="Pesquisa rápida"
      onSubmit={(e) => {
        e.preventDefault();
        pesquisar();
      }}
      className="rounded-2xl border border-line bg-background p-4 sm:p-5"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Campo rotulo="Marca">
          <select
            className={campoClasses}
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          >
            <option value="">Todas</option>
            {marcas.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.nome}
              </option>
            ))}
          </select>
        </Campo>

        <Campo rotulo="Combustível">
          <select
            className={campoClasses}
            value={combustivel}
            onChange={(e) => setCombustivel(e.target.value)}
          >
            <option value="">Todos</option>
            {combustiveis.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Campo>

        <Campo rotulo="Até">
          <select
            className={campoClasses}
            value={precoMax}
            onChange={(e) => setPrecoMax(e.target.value)}
          >
            <option value="">Qualquer preço</option>
            {degraus.map((d) => (
              <option key={d} value={d}>
                {d.toLocaleString("pt-PT")} €
              </option>
            ))}
          </select>
        </Campo>
      </div>

      {/*
        O botão ocupa a largura toda do cartão e diz quantas viaturas vai
        mostrar — o número muda enquanto se escolhe, portanto o botão é também
        o resultado da pesquisa antes de se carregar nele.
      */}
      <button
        type="submit"
        className="laranja-fill press mt-4 h-[46px] w-full rounded-xl px-7 text-sm font-medium text-ink"
      >
        Ver <Contador valor={resultados} />{" "}
        {resultados === 1 ? "viatura" : "viaturas"}
      </button>
    </form>
  );
}

/*
  A tira de marcas.

  Substitui a grelha de marcas que era uma secção inteira da home. Com cinco
  marcas e sete carros, uma secção a dizer «escolha pela marca» ocupava um ecrã
  para oferecer uma escolha entre uma e duas viaturas. A funcionalidade —
  filtrar o catálogo por marca — não se perde; muda de escala, e fica ao lado
  da pesquisa, que é onde se procura por marca.
*/
export function TiraMarcas({ viaturas }: { viaturas: Viatura[] }) {
  const marcas = useMemo(() => getMarcas(viaturas), [viaturas]);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {/* Branco esbatido: a tira assenta na abertura escura, o `muted` foi
          medido para papel e o `escuro-muted` para o fundo liso do rodapé —
          nenhum dos dois passa contra uma fotografia. Ver o comentário da
          linha de factos em `Abertura.tsx`. */}
      <span className="text-xs uppercase tracking-[0.2em] text-background/80">
        Ou pela marca
      </span>
      {marcas.map((m) => {
        const logo = logoMarca(m.slug);
        return (
          <Link
            key={m.slug}
            href={urlViaturasPorMarca(m.slug)}
            className="press flex items-center opacity-70 transition-opacity duration-300 hover:opacity-100"
            aria-label={`Ver ${m.nome}`}
          >
            {logo ? (
              /*
                **Sem `invert`, e esse é exactamente o dia que o comentário
                anterior previa.**

                Os logótipos são monocromáticos **brancos** — foram escolhidos
                assim para o tema escuro. Quando o site passou a claro,
                ficavam invisíveis sobre papel, e o `invert` resolvia os dois
                formatos de uma vez (o `fill="#ffffff"` dos SVG e o branco dos
                WEBP tornavam-se pretos, sem tocar no alfa). Ficou escrito ali
                que, no dia em que houvesse uma faixa escura com marcas lá
                dentro, se tirava o `invert` e os mesmos ficheiros serviam.

                A tira vive hoje dentro da abertura, que é uma fotografia
                escurecida. Brancos é o que eles têm de ser, e o filtro sai.
                Se esta tira voltar algum dia a assentar em papel, é o
                `invert` que volta com ela.
              */
              // eslint-disable-next-line @next/next/no-img-element -- logótipo estático em /public (mistura de svg/webp)
              <img
                src={logo}
                alt={m.nome}
                className="h-6 w-auto max-w-[110px] object-contain"
              />
            ) : (
              <span className="text-sm text-background">{m.nome}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
