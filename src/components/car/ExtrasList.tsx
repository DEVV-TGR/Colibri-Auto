import type { Viatura } from "@/lib/types";

export function ExtrasList({ viatura }: { viatura: Viatura }) {
  if (viatura.extras.length === 0) return null;

  return (
    <section aria-labelledby="extras">
      <h2 id="extras" className="font-display h-sub text-ink">
        Extras e <span className="italic text-gold">equipamento</span>
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {viatura.extras.map((grupo) => (
          <div key={grupo.categoria}>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {grupo.categoria}
            </p>
            <ul className="mt-3 space-y-2">
              {grupo.itens.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <span aria-hidden className="mt-[3px] text-gold-deep">
                    ◆
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
