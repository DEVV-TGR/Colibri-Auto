import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "laranja" | "contorno" | "fantasma";

const estilos: Record<Variante, string> = {
  laranja: "laranja-fill text-background font-medium",
  contorno:
    "border border-laranja/40 text-creme hover:border-laranja hover:text-laranja-bright",
  fantasma: "text-muted hover:text-laranja-bright",
};

// `press` trata da transição (cor, brilho e escala) — ver globals.css
const base =
  "press inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide cursor-pointer select-none";

export function BotaoLink({
  variante = "laranja",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variante?: Variante; children: ReactNode }) {
  return (
    <Link {...props} className={`${base} ${estilos[variante]} ${className}`}>
      {children}
    </Link>
  );
}

export function Botao({
  variante = "laranja",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variante?: Variante; children: ReactNode }) {
  return (
    <button {...props} className={`${base} ${estilos[variante]} ${className}`}>
      {children}
    </button>
  );
}
