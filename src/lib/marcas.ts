/**
 * Logótipos monocromáticos brancos por marca (`public/logo/marcas`).
 *
 * A grelha da homepage é gerada a partir das marcas que existem no inventário,
 * não desta lista — aqui só se diz quais têm desenho. Uma marca sem entrada não
 * parte nada: `logoMarca()` devolve `null` e a grelha desenha o nome em vez do
 * símbolo, no mesmo espaço e com o mesmo peso óptico.
 */
const LOGOS: Record<string, string> = {
  ford: "/logo/marcas/ford.svg",
  "mercedes-benz": "/logo/marcas/mercedes-benz.webp",
  renault: "/logo/marcas/renault.svg",
  mazda: "/logo/marcas/mazda.svg",
  volkswagen: "/logo/marcas/volkswagen.svg",
};

/** Caminho do logótipo da marca, ou null se não houver (fallback ao nome). */
export function logoMarca(slug: string): string | null {
  return LOGOS[slug] ?? null;
}
