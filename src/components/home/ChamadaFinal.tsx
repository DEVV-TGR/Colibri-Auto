import { BotaoLink } from "@/components/ui/Botao";
import { Reveal } from "@/components/ui/Reveal";

/*
  O fecho da home.

  Existe por causa de uma consequência directa de o stock ser pequeno: com sete
  viaturas, a maioria de quem chega **não encontra o que procurava**. Numa
  listagem de duzentos carros essa pessoa continua a clicar; aqui chega ao fim
  da página e sai.

  Esta banda é a porta que essa pessoa encontra em vez da parede. Diz o que a
  Colibri já faz e que não estava dito em lado nenhum da home — que procuram e
  trazem por encomenda —, e é por isso que fica no fim e não a meio: a meio,
  interrompia quem ainda estava a ver carros.
*/
export function ChamadaFinal() {
  return (
    <section className="border-t border-line/60 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-display h-sub text-ink">
                Não está aqui o que{" "}
                <span className="font-extrabold text-laranja-deep">procura</span>?
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Diga-nos a marca, o modelo e quanto quer gastar. Procuramos, e
                se for preciso importamos — sem custo e sem compromisso até
                haver uma viatura concreta em cima da mesa.
              </p>
            </div>
            <BotaoLink href="/importamos" className="shrink-0">
              Dizer o que procuro
            </BotaoLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
