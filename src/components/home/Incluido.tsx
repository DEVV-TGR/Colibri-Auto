import { NumeroEmScroll } from "@/components/ui/NumeroEmScroll";
import { Reveal } from "@/components/ui/Reveal";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import type { Viatura } from "@/lib/types";

/*
  O que vai no preço.

  A secção que o sistema de origem não tinha, e que aqui faz falta: num stand
  premium a garantia presume-se, num stand de bairro é o argumento. «Garantia
  incluída no preço» é a frase que a Colibri repete em todas as publicações, e
  não estava em lado nenhum do site senão numa linha de rodapé.

  Os números em cima são deliberadamente pequenos e verificáveis — sete
  viaturas, doze meses, dez minutos. Nenhum é uma estatística de vendas nem um
  «anos de experiência», que é o que estas bandas costumam trazer e o que a
  Colibri não pode dizer: abriram há pouco, e um número inventado aqui seria a
  primeira mentira do site.
*/

const CARTOES = [
  {
    titulo: "Garantia incluída",
    texto:
      "Não é um extra a pagar à parte no fim. Vai no preço que está no anúncio, em todas as viaturas.",
  },
  {
    titulo: "Financiamento",
    texto:
      "Se precisar, tratamos do processo consigo e explicamos as condições antes de assinar seja o que for.",
  },
  {
    titulo: "Retoma",
    texto:
      "O carro que já tem pode entrar como parte do pagamento. Avaliamos no momento, com o carro à frente.",
  },
  {
    titulo: "Sem marcação",
    texto:
      "Apareça quando lhe der jeito, dentro do horário. Não é preciso telefonar antes nem agendar visita.",
  },
] as const;

export function Incluido({ viaturas }: { viaturas: Viatura[] }) {
  const emStock = viaturas.filter((v) => v.estadoVenda !== "vendido").length;

  /*
    A garantia mínima é lida do inventário, não escrita à mão. Hoje dá 12, mas
    se um dia todas as viaturas passarem a 18 meses este número acompanha — e
    se alguma entrar com menos, o site baixa-o sozinho em vez de continuar a
    prometer o que já não é verdade.
  */
  const garantiaMinima = Math.min(
    ...viaturas.map((v) => Number.parseInt(v.garantia, 10)).filter(Number.isFinite),
  );

  const numeros = [
    { valor: emStock, unidade: "viaturas em stock" },
    { valor: garantiaMinima, unidade: "meses de garantia, no mínimo" },
    { valor: 10, unidade: "minutos do Porto" },
  ];

  return (
    <section className="border-y border-line/60 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <TituloSeccao
            numero="03"
            rotulo="Condições"
            titulo={
              <>
                O que vai no{" "}
                <span className="font-extrabold text-laranja-deep">preço</span>.
              </>
            }
          >
            Sem asteriscos e sem «sob consulta». O que está escrito aqui é o que
            se aplica a todas as viaturas do stock.
          </TituloSeccao>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-6 border-y border-line/50 py-8 sm:grid-cols-3">
            {numeros.map((n) => (
              <div key={n.unidade}>
                <p className="font-display text-5xl text-laranja-deep">
                  <NumeroEmScroll valor={n.valor} />
                </p>
                <p className="mt-2 text-sm text-muted">{n.unidade}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARTOES.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-2xl border border-line/60 bg-surface p-6 shadow-card">
                <div className="hairline w-10" />
                <h3 className="mt-4 font-display text-xl text-ink">{c.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
