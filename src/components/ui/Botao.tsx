import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "laranja" | "contorno" | "fantasma";

/*
  No tema escuro o contorno era uma borda laranja a 40% com texto creme: sobre
  preto lia-se bem. Sobre papel, 40% de laranja é um risco cor de pêssego que
  desaparece. Passa a borda cheia com texto antracite, e o hover pinta o
  interior de laranja pálido em vez de mudar a cor da letra — num fundo claro,
  ver a área a acender é mais claro do que ver a palavra mudar de tom.
*/
const estilos: Record<Variante, string> = {
  laranja: "laranja-fill font-medium shadow-card",
  contorno:
    "border border-laranja text-ink hover:bg-laranja/10 hover:text-laranja-deep",
  fantasma: "text-muted hover:text-laranja-deep",
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
