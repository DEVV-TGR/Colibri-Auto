import {
  formatarCilindrada,
  formatarKm,
  formatarPotencia,
  formatarRegisto,
} from "@/lib/format";
import type { Viatura } from "@/lib/types";

function simNao(v: boolean) {
  return v ? "Sim" : "Não";
}

export function SpecsTable({ viatura }: { viatura: Viatura }) {
  const principais: [string, string][] = [
    ["Registo", formatarRegisto(viatura.registoMes, viatura.registoAno)],
    ["Quilómetros", formatarKm(viatura.quilometros)],
    ["Combustível", viatura.combustivel],
    ["Potência", formatarPotencia(viatura.potenciaCv)],
    ["Cilindrada", formatarCilindrada(viatura.cilindradaCc)],
    ["Transmissão", viatura.transmissao],
    ["Segmento", viatura.segmento],
    ["Lugares", String(viatura.lugares)],
    ["Portas", String(viatura.portas)],
    ["Cor", viatura.cor],
    ["Cor interior", viatura.corInterior],
    ["Origem", viatura.origem],
    ["Estado", viatura.estado],
    ["Garantia", viatura.garantia],
  ];

  const adicionais: [string, string][] = [
    ["Livro de revisões", simNao(viatura.livroRevisoes)],
    ["2.ª chave", simNao(viatura.segundaChave)],
    ["Classe de portagem", viatura.classePortagem],
    ["Matrícula", viatura.matricula],
    ["VIN", viatura.vin],
  ];

  return (
    <section aria-labelledby="ficha-tecnica">
      <h2 id="ficha-tecnica" className="font-display h-sub text-ink">
        Ficha <span className="italic text-gold">técnica</span>
      </h2>

      <dl className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {principais.map(([rotulo, valor]) => (
          <div
            key={rotulo}
            className="flex items-baseline justify-between gap-4 border-b border-line/50 py-3"
          >
            <dt className="text-sm text-muted">{rotulo}</dt>
            <dd className="text-right text-sm text-ink">{valor}</dd>
          </div>
        ))}
      </dl>

      <details className="group mt-6">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-champagne transition-colors hover:text-gold-bright [&::-webkit-details-marker]:hidden">
          <span className="text-gold transition-transform duration-200 group-open:rotate-90">
            ›
          </span>
          Informação adicional
        </summary>
        <dl className="mt-3 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {adicionais.map(([rotulo, valor]) => (
            <div
              key={rotulo}
              className="flex items-baseline justify-between gap-4 border-b border-line/50 py-3"
            >
              <dt className="text-sm text-muted">{rotulo}</dt>
              <dd className="text-right font-mono text-xs text-ink sm:text-sm">
                {valor}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </section>
  );
}
