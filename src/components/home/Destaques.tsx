import { DestaquesCarrossel } from "@/components/home/DestaquesCarrossel";
import { porExtenso } from "@/lib/format";
import { BotaoLink } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import type { Viatura } from "@/lib/types";

export function Destaques({ destaques }: { destaques: Viatura[] }) {
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

      <DestaquesCarrossel destaques={destaques} />

      <div className="mt-8 text-center sm:hidden">
        <BotaoLink href="/viaturas" variante="contorno">
          Ver o stock todo
        </BotaoLink>
      </div>
    </section>
  );
}
