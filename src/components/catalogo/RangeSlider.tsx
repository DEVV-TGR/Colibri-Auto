"use client";

/**
 * Slider de intervalo com dois thumbs, construído sobre dois <input type="range">
 * nativos (teclado e leitores de ecrã funcionam de raiz).
 */
export function RangeSlider({
  rotulo,
  min,
  max,
  passo,
  valorMin,
  valorMax,
  onChange,
  formatar = (v) => String(v),
}: {
  rotulo: string;
  min: number;
  max: number;
  passo: number;
  valorMin: number;
  valorMax: number;
  onChange: (min: number, max: number) => void;
  formatar?: (v: number) => string;
}) {
  const amplitude = max - min || 1;
  const pctMin = ((valorMin - min) / amplitude) * 100;
  const pctMax = ((valorMax - min) / amplitude) * 100;

  return (
    <fieldset>
      <legend className="mb-1.5 w-full text-xs">
        <span className="block uppercase tracking-[0.2em] text-muted">
          {rotulo}
        </span>
        <span className="mt-1 block text-champagne">
          {formatar(valorMin)} — {formatar(valorMax)}
        </span>
      </legend>
      <div className="relative h-8">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-gold"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <input
          type="range"
          aria-label={`${rotulo} mínimo`}
          min={min}
          max={max}
          step={passo}
          value={valorMin}
          onChange={(e) =>
            onChange(Math.min(Number(e.target.value), valorMax), valorMax)
          }
          className="range-dual absolute inset-0 w-full"
        />
        <input
          type="range"
          aria-label={`${rotulo} máximo`}
          min={min}
          max={max}
          step={passo}
          value={valorMax}
          onChange={(e) =>
            onChange(valorMin, Math.max(Number(e.target.value), valorMin))
          }
          className="range-dual absolute inset-0 w-full"
        />
      </div>
    </fieldset>
  );
}
