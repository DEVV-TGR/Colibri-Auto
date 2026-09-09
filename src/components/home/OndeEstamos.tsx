import { DadosContacto } from "@/components/contactos/DadosContacto";
import { MapaStand } from "@/components/contactos/MapaStand";
import { Reveal } from "@/components/ui/Reveal";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import { stand } from "@/data/stand";

/*
  Onde estamos.

  Era uma grelha de duas colunas iguais — texto à esquerda, mapa à direita, a
  50/50 —, e a 50/50 o mapa fica pequeno demais para se perceber onde é e
  grande demais para ser um detalhe. Aqui o mapa passa a **fundo**: ocupa a
  banda toda, e o cartão de contactos assenta por cima dele, encostado à
  esquerda.

  Faz diferença para este stand em particular. A Colibri não está numa rua com
  nome conhecido — está na Avenida Mário Brito, em Perafita, ao lado da A28.
  Quem chega ao site pelo telemóvel quer perceber se lhe fica a caminho, e isso
  lê-se num mapa grande, não num postal.

  ## O «sobre» está no cabeçalho e não no cartão

  Não é preferência de composição — é o que impede o cartão de partir a secção.
  Com os dois parágrafos lá dentro o cartão ficava mais alto do que o mapa, e
  um bloco `items-center` mais alto do que o contentor transborda pelos dois
  lados: subia por cima do título da secção e tapava o subtítulo.

  Podia resolver-se encostando ao topo, mas a resposta certa é outra: um
  parágrafo de prosa lê-se melhor com a largura de um parágrafo do que espremido
  num cartão de 448px, e o cartão fica a fazer o que um cartão sobreposto a um
  mapa deve fazer — morada, telefones, horário e os botões de lá chegar.

  Ao acrescentar linhas ao cartão, medir. O tecto é a altura do mapa.
*/
export function OndeEstamos() {
  return (
    <section
      id="contactos"
      className="scroll-mt-24 border-t border-line/60 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <Reveal>
          <TituloSeccao
            numero="04"
            rotulo="Visitar"
            titulo={
              <>
                Estamos na Avenida Mário{" "}
                <span className="font-extrabold text-laranja">Brito</span>.
              </>
            }
          >
            Em Perafita, a dez minutos do Porto e com saída directa da A28.
            Apareça sem marcar — dentro do horário está lá sempre alguém.
          </TituloSeccao>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-x-10 gap-y-4 lg:grid-cols-2">
            {stand.sobre.map((paragrafo) => (
              <p
                key={paragrafo.slice(0, 24)}
                className="text-sm leading-relaxed text-muted"
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/*
        O mapa é o fundo da banda e o cartão assenta-lhe por cima. Em ecrãs
        estreitos deixa de haver sobreposição: o mapa fica em cima e o cartão
        por baixo, porque um cartão a tapar um mapa de 360px de largura tapa o
        mapa inteiro.
      */}
      <div className="relative mt-12">
        {/*
          620px e não 540: o cartão sobreposto mede cerca de 575px com o
          horário e os três botões, e um bloco `items-center` mais alto do que
          o contentor transborda pelos dois lados. A altura do mapa é o tecto
          do cartão — ao acrescentar uma linha a um, medir o outro.
        */}
        <MapaStand className="h-[420px] w-full lg:h-[620px]" />

        <div className="px-4 sm:px-6 lg:pointer-events-none lg:absolute lg:inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center">
            <Reveal className="w-full lg:w-auto">
              <div className="pointer-events-auto -mt-12 rounded-2xl border border-line bg-background/95 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl lg:mt-0 lg:max-w-sm">
                <DadosContacto />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
