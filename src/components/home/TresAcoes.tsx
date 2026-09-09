import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TituloSeccao } from "@/components/ui/TituloSeccao";

/*
  Comprar, vender, trocar.

  Substitui duas secções do sistema de origem — a grelha de marcas e o
  «compramos o seu carro» — por uma só, e a razão é que na Colibri são a mesma
  conversa. A lona à porta do stand diz **COMPRA · VENDA · RETOMA**: não são
  três serviços num catálogo, são as três coisas que o negócio faz, e é assim
  que eles próprios se apresentam a quem passa na avenida.

  Escrito da perspectiva de quem visita, e não da do stand. «Compramos o seu
  carro» é o stand a falar de si; «Vender o meu» é a pessoa a dizer o que quer
  fazer, e é a segunda que se clica.
*/

const ACCOES = [
  {
    n: "01",
    titulo: "Comprar",
    texto:
      "O stock está todo no site, com preço à vista. Todas as viaturas saem daqui com garantia incluída no preço.",
    href: "/viaturas",
    accao: "Ver o stock",
  },
  {
    n: "02",
    titulo: "Vender",
    texto:
      "Compramos o seu carro directamente. Diga-nos o que tem, e dizemos-lhe quanto vale — sem compromisso nenhum.",
    href: "/compramos",
    accao: "Pedir avaliação",
  },
  {
    n: "03",
    titulo: "Trocar",
    texto:
      "Aceitamos retoma: o carro que já tem entra como parte do pagamento do próximo, e o que falta pode ser financiado.",
    href: "/compramos",
    accao: "Falar de retoma",
  },
] as const;

export function TresAcoes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <TituloSeccao
          numero="02"
          rotulo="O que fazemos"
          titulo={
            <>
              Compra, venda e{" "}
              <span className="font-extrabold text-laranja">retoma</span>.
            </>
          }
        >
          É o que está escrito na lona à porta, e é literalmente tudo o que
          fazemos. Não há departamentos.
        </TituloSeccao>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {ACCOES.map((a, i) => (
          <Reveal key={a.titulo} delay={i * 0.08} className="h-full">
            <Link
              href={a.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface p-8 transition-colors duration-300 hover:border-laranja/50"
            >
              {/*
                O varrimento. Um degradê laranja que sobe do fundo do painel ao
                passar o rato — em `opacity` e não a trocar `background`, para
                a transição ser interpolável e não um corte. `pointer-events-none`
                porque está por cima do conteúdo do painel.
              */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-laranja/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="relative font-mono text-sm text-laranja transition-transform duration-500 group-hover:-translate-y-1">
                {a.n}
              </span>
              <h3 className="relative mt-6 font-display h-sub text-ink">
                {a.titulo}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
                {a.texto}
              </p>
              <span className="relative mt-8 inline-flex items-center gap-2 text-sm text-creme transition-colors duration-300 group-hover:text-laranja-bright">
                {a.accao}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
