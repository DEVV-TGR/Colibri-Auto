"use client";

import { useState } from "react";
import { RangeSlider } from "@/components/catalogo/RangeSlider";
import { SelectField } from "@/components/catalogo/SelectField";
import {
  getCombustiveis,
  getIntervalos,
  getMarcas,
  getModelos,
  getSegmentos,
  getTransmissoes,
} from "@/lib/derivados";
import type { Filtros } from "@/lib/filtros";
import { formatarKm, formatarPreco } from "@/lib/format";
import type { Combustivel, Segmento, Transmissao, Viatura } from "@/lib/types";

/*
  Os filtros, em barra horizontal no topo da listagem.

  Estavam numa coluna de 280px à esquerda, que é o que se faz quando há
  centenas de anúncios e a filtragem é o trabalho principal da página. Com sete
  viaturas o cálculo inverte-se: a coluna comia um quarto da largura para
  oferecer escolhas que quase não reduzem nada, e a grelha ficava presa a duas
  colunas quando cabiam três.

  Em barra, os cinco selects ocupam uma linha, a grelha fica com a página toda,
  e os intervalos — preço, ano, quilómetros — descem para uma gaveta que só
  abre a pedido. É a hierarquia certa para este stock: escolhe-se marca ou
  combustível de relance, e um intervalo de quilómetros é para quem já está a
  comparar duas viaturas concretas.

  Só desktop. Em telemóvel continua a valer o painel em modal do
  `CatalogoClient`, que já existia e que uma barra horizontal não substitui.
*/

function Seta({ aberta }: { aberta: boolean }) {
  return (
    <span
      aria-hidden
      className={`text-laranja transition-transform duration-200 ${aberta ? "rotate-180" : ""}`}
    >
      ▾
    </span>
  );
}

export function FiltrosBarra({
  viaturas,
  filtros,
  onChange,
  onLimpar,
  temFiltros,
}: {
  viaturas: Viatura[];
  filtros: Filtros;
  onChange: (f: Filtros) => void;
  onLimpar: () => void;
  temFiltros: boolean;
}) {
  const intervalos = getIntervalos(viaturas);

  /*
    A gaveta abre sozinha se o endereço já trouxer um intervalo. Sem isto,
    alguém que chegue por um link com `?precoMax=9000` via a listagem filtrada
    e o controlo que a filtrou escondido — e a única forma de perceber o que se
    estava a passar era abrir a gaveta às cegas.
  */
  const [aberta, setAberta] = useState(
    filtros.precoMin !== undefined ||
      filtros.precoMax !== undefined ||
      filtros.anoMin !== undefined ||
      filtros.anoMax !== undefined ||
      filtros.kmMin !== undefined ||
      filtros.kmMax !== undefined,
  );

  return (
    <div className="rounded-2xl border border-line/60 bg-surface">
      <div className="grid grid-cols-2 gap-4 p-5 xl:grid-cols-6">
        <SelectField
          rotulo="Marca"
          valor={filtros.marca ?? ""}
          todos="Todas"
          opcoes={getMarcas(viaturas).map((m) => ({ valor: m.slug, rotulo: m.nome }))}
          onChange={(v) =>
            onChange({ ...filtros, marca: v || undefined, modelo: undefined })
          }
        />
        <SelectField
          rotulo="Modelo"
          valor={filtros.modelo ?? ""}
          opcoes={getModelos(viaturas, filtros.marca).map((m) => ({
            valor: m.slug,
            rotulo: m.nome,
          }))}
          onChange={(v) => onChange({ ...filtros, modelo: v || undefined })}
        />
        <SelectField
          rotulo="Combustível"
          valor={filtros.combustivel ?? ""}
          opcoes={getCombustiveis(viaturas).map((c) => ({ valor: c, rotulo: c }))}
          onChange={(v) =>
            onChange({
              ...filtros,
              combustivel: (v || undefined) as Combustivel | undefined,
            })
          }
        />
        <SelectField
          rotulo="Transmissão"
          valor={filtros.transmissao ?? ""}
          todos="Todas"
          opcoes={getTransmissoes(viaturas).map((t) => ({ valor: t, rotulo: t }))}
          onChange={(v) =>
            onChange({
              ...filtros,
              transmissao: (v || undefined) as Transmissao | undefined,
            })
          }
        />
        <SelectField
          rotulo="Segmento"
          valor={filtros.segmento ?? ""}
          opcoes={getSegmentos(viaturas).map((s) => ({ valor: s, rotulo: s }))}
          onChange={(v) =>
            onChange({
              ...filtros,
              segmento: (v || undefined) as Segmento | undefined,
            })
          }
        />

        {/*
          O botão alinha-se pelo fundo dos selects — eles têm um rótulo por
          cima e este não, e sem o `self-end` ficava a meia altura da coluna.
        */}
        <button
          type="button"
          onClick={() => setAberta((a) => !a)}
          aria-expanded={aberta}
          className="press flex h-[46px] items-center justify-center gap-2 self-end rounded-xl border border-line px-4 text-sm text-creme transition-colors hover:border-laranja hover:text-laranja-bright"
        >
          Preço, ano e km
          <Seta aberta={aberta} />
        </button>
      </div>

      {aberta && (
        <div className="grid gap-x-8 gap-y-6 border-t border-line/60 px-5 py-6 lg:grid-cols-3">
          <RangeSlider
            rotulo="Preço"
            min={intervalos.preco[0]}
            max={intervalos.preco[1]}
            passo={1000}
            valorMin={filtros.precoMin ?? intervalos.preco[0]}
            valorMax={filtros.precoMax ?? intervalos.preco[1]}
            formatar={formatarPreco}
            onChange={(mn, mx) =>
              onChange({
                ...filtros,
                precoMin: mn === intervalos.preco[0] ? undefined : mn,
                precoMax: mx === intervalos.preco[1] ? undefined : mx,
              })
            }
          />
          <RangeSlider
            rotulo="Ano"
            min={intervalos.ano[0]}
            max={intervalos.ano[1]}
            passo={1}
            valorMin={filtros.anoMin ?? intervalos.ano[0]}
            valorMax={filtros.anoMax ?? intervalos.ano[1]}
            onChange={(mn, mx) =>
              onChange({
                ...filtros,
                anoMin: mn === intervalos.ano[0] ? undefined : mn,
                anoMax: mx === intervalos.ano[1] ? undefined : mx,
              })
            }
          />
          <RangeSlider
            rotulo="Quilómetros"
            min={intervalos.km[0]}
            max={intervalos.km[1]}
            passo={5000}
            valorMin={filtros.kmMin ?? intervalos.km[0]}
            valorMax={filtros.kmMax ?? intervalos.km[1]}
            formatar={formatarKm}
            onChange={(mn, mx) =>
              onChange({
                ...filtros,
                kmMin: mn === intervalos.km[0] ? undefined : mn,
                kmMax: mx === intervalos.km[1] ? undefined : mx,
              })
            }
          />
        </div>
      )}

      {temFiltros && (
        <div className="border-t border-line/60 px-5 py-3 text-right">
          <button
            type="button"
            onClick={onLimpar}
            className="text-xs text-muted underline-offset-4 transition-colors hover:text-laranja-bright hover:underline"
          >
            Limpar parâmetros
          </button>
        </div>
      )}
    </div>
  );
}
