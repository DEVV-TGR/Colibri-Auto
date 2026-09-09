import { CarCard } from "@/components/car/CarCard";
import { porExtenso } from "@/lib/format";
import { BotaoLink } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import type { Viatura } from "@/lib/types";

/*
  Os destaques, em grelha.

  Era um carrossel com efeito de coverflow, herdado do sistema de origem e
  mantido a pedido — até o cliente ver a home montada e dizer que não gostava
  nada dos carrosséis. Com **quatro** viaturas em destaque, a grelha ganha o
  argumento sozinha: mostra as quatro de uma vez em vez de esconder três atrás
  de setas, e não obriga ninguém a interagir para ver o que há.

  Um carrossel paga-se quando o conteúdo não cabe. Quatro cards cabem.
*/
export function Destaques({ destaques }: { destaques: Viatura[] }) {
  if (destaques.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <TituloSeccao
          numero="01"
          rotulo="Em destaque"
          titulo={
            <>
              {porExtenso(destaques.length)} para{" "}
              <span className="font-extrabold text-laranja-deep">começar</span>.
            </>
          }
          accao={
            <BotaoLink
              href="/viaturas"
              variante="fantasma"
              className="hidden shrink-0 sm:inline-flex"
            >
              Ver o stock todo →
            </BotaoLink>
          }
        >
          {/*
            «Não há catálogo escondido» é a diferença de fundo entre este stand
            e o sistema de onde o site veio, onde os destaques eram uma
            curadoria e o resto ficava por trás de uma listagem. Aqui os
            destaques são só o que se mostra primeiro.
          */}
          As que temos mais vontade de mostrar. O resto está todo no stock — não
          há catálogo escondido nem «sob consulta».
        </TituloSeccao>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destaques.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.08} className="h-full">
            <CarCard viatura={v} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center sm:hidden">
        <BotaoLink href="/viaturas" variante="contorno">
          Ver o stock todo
        </BotaoLink>
      </div>
    </section>
  );
}
