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
  A pesquisa rápida, agora uma banda de largura total.

  No sistema de origem isto era um cartão translúcido a flutuar por cima da
  fotografia do hero. Aqui não há fotografia por baixo, e um cartão a flutuar
  sobre nada é um cartão perdido — passa a ser uma **barra**, encostada à
  costura entre a abertura e o corpo da página. Ganha-se largura para os três
  campos ficarem numa linha só a partir do tablet, e a página ganha uma
  articulação horizontal onde antes tinha um bloco solto.

  Três campos e não quatro. Marca, combustível e tecto de preço são as três
  perguntas que alguém faz de pé à porta de um stand; modelo, ano, caixa e
  quilómetros são para quem já está a comparar, e esses vivem em `/viaturas`.
  O tecto de preço substitui o campo «modelo» que aqui estava: com sete
  viaturas, escolher o modelo é escolher o carro, e a pergunta deixa de ter
  utilidade.
*/

const campoClasses =
  "w-full appearance-none rounded-xl border border-line bg-background px-4 py-3 pr-10 text-sm text-ink outline-none transition-colors focus:border-laranja [&>option]:bg-surface";

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
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-laranja"
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

export function BarraPesquisa({ viaturas }: { viaturas: Viatura[] }) {
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
    <section
      aria-label="Pesquisa rápida"
      className="border-b border-line/60 bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
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

          <button
            type="button"
            onClick={pesquisar}
            className="laranja-fill press h-[46px] rounded-xl px-7 text-sm font-medium text-background"
          >
            Ver <Contador valor={resultados} />{" "}
            {resultados === 1 ? "viatura" : "viaturas"}
          </button>
        </div>

        {/*
          A tira de marcas.

          Substitui a grelha de marcas que era uma secção inteira da home. Com
          cinco marcas e sete carros, uma secção a dizer «escolha pela marca»
          ocupava um ecrã para oferecer uma escolha entre uma e duas viaturas.
          A funcionalidade — filtrar o catálogo por marca — não se perde; muda
          de escala, e passa a estar ao lado da pesquisa, que é onde se procura
          por marca.
        */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/50 pt-5">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Ou pela marca
          </span>
          {marcas.map((m) => {
            const logo = logoMarca(m.slug);
            return (
              <Link
                key={m.slug}
                href={urlViaturasPorMarca(m.slug)}
                className="press flex items-center opacity-60 transition-opacity duration-300 hover:opacity-100"
                aria-label={`Ver ${m.nome}`}
              >
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- logótipo estático em /public (mistura de svg/webp)
                  <img src={logo} alt={m.nome} className="h-6 w-auto max-w-[110px] object-contain" />
                ) : (
                  <span className="text-sm text-ink">{m.nome}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
