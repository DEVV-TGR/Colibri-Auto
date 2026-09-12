/*
  A promessa da casa, entre a abertura e a montra.

  **Isto era a `FaixaLona`**, e a mudança não foi de estilo: foi de função.

  A faixa era uma banda laranja de margem a margem com `COMPRA · VENDA ·
  RETOMA · GARANTIA INCLUÍDA · FINANCIAMENTO` a deslizar em maiúsculas
  pesadas. Reproduzia a lona de seis metros que está à porta do stand, e a
  ideia tinha lógica — só que, na página, essas cinco palavras são exactamente
  a soma dos títulos das duas secções que vêm logo a seguir: a 02 diz
  «Comprar / Vender / Trocar» e a 03 diz «Garantia incluída / Financiamento /
  Retoma / Sem marcação».

  Ou seja: uma banda a gritar, ao dobro do corpo, com as palavras cortadas nas
  duas pontas pelo marquee, um resumo do que a página diz a seguir com calma e
  em condições. O problema não era o aspecto — era não ter trabalho nenhum.

  O que faz agora é dizer como o stand escolhe o stock — a única afirmação da
  página que sai directamente das palavras do cliente e que mais nenhum título
  faz. Os serviços ficam por baixo, cada um com uma linha, como índice do que
  vem a seguir em vez de eco do que veio antes.

  ## Porque é escura, e o que isso custa

  A escolha foi do cliente entre três tratamentos. O chão escuro continua a
  matéria da abertura e deixa o laranja ser acento em vez de mancha — é o que
  faz a secção ler-se como desenhada e não como banner de promoção.

  **O custo é real e está aqui escrito:** o site deixa de ter uma área grande
  de laranja. A regra 2 do sistema dizia «áreas grandes de laranja só numa: a
  `FaixaLona`», e essa frase deixou de ser verdade — o `docs/brand/02` foi
  corrigido no mesmo commit. O laranja continua em mancha nos sítios pequenos
  onde sempre esteve (botões, etiquetas de preço, badges) e ganha aqui o papel
  de acento tipográfico.

  ## O que continua por resolver

  A secção 02 (`TresAcoes`) continua a explicar Comprar / Vender / Trocar em
  três cartões, poucos ecrãs abaixo desta lista. A duplicação diminuiu mas não
  desapareceu — mudou de sítio. Se um dia se arrumar, é a 02 que sai, não esta:
  aqui as quatro entradas são um índice de uma linha, lá são três cartões com
  parágrafo e chamada.
*/

const SERVICOS = [
  {
    titulo: "Compra",
    /*
      «o preço sempre no anúncio» e não «o preço à vista»: em português
      comercial «à vista» significa pagamento a pronto, e a frase passava a
      prometer uma modalidade de pagamento em vez de dizer que o preço está
      escrito.

      O «sem "sob consulta"» esteve aqui e saiu: fazia esta entrada ocupar três
      linhas contra duas das vizinhas, e numa fila de quatro esse degrau
      vê-se. A ideia não se perde — a secção 03 abre exactamente com «Sem
      asteriscos e sem "sob consulta"».
    */
    texto: "Stock escolhido carro a carro, e o preço sempre no anúncio.",
  },
  {
    titulo: "Venda",
    texto: "Compramos o seu directamente, e dizemos-lhe quanto vale.",
  },
  {
    titulo: "Retoma",
    texto: "O carro que já tem entra como parte do pagamento.",
  },
  {
    titulo: "Financiamento",
    texto: "Tratamos do processo e explicamos as condições antes de assinar.",
  },
] as const;

export function Promessa() {
  /*
    `.faixa-escura` e não `bg-escuro`: a classe já existia no sistema para «o
    rodapé, e qualquer secção que precise de fechar a página», e traz o fundo
    **e** a cor do texto juntos. É o que faz os títulos aqui dentro dispensarem
    `text-background` — herdam-no, tal como no rodapé.
  */
  return (
    <section aria-labelledby="promessa" className="faixa-escura">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {/*
          **A frase é do cliente, e isso não é um detalhe.**

          Aqui esteve «O preço do anúncio é o preço final.», escrita por mim a
          partir do tom do site. Não se aguentava: as fontes que a inspiraram —
          `stand.sobre`, e o cartão «Garantia incluída» da secção 03 — dizem
          que **a garantia** vai no preço, não que não haja mais nada a pagar.
          Numa compra de usado há quase sempre a transferência de propriedade,
          e com financiamento há mais. Era uma afirmação que qualquer comprador
          desmentia ao balcão, e o site não pode fazer isso ao stand.

          A que está agora sai de `stand.sobre[0]`, escrita pelo próprio
          cliente. Diz como escolhem o stock — coisa que mais nenhum título da
          página afirma — e não promete nenhum número verificável.

          O realce cai sobre «pelo estado em que estão» e não sobre a última
          palavra, que é o padrão das outras secções: aqui a última palavra é
          «têm» e o que a frase opõe é *estado* contra *etiqueta*. Realçar o
          fim era seguir a forma e perder o sentido.

          `laranja-bright` e não `laranja`: sobre o antracite do `--escuro` o
          bright é o par que o rodapé já usa. É texto grande, mínimo 3:1 —
          passa com folga.
        */}
        <h2 id="promessa" className="font-display h-sub max-w-[26ch]">
          Escolhidas{" "}
          <span className="text-laranja-bright">pelo estado em que estão</span>,
          não pela etiqueta que têm.
        </h2>

        {/*
          Filetes só a partir de `lg`. Em duas colunas (`sm`) uma borda à
          direita cai a meio da grelha e lê-se como um erro; em quatro, separa
          o que é para separar. Abaixo de `sm` a lista empilha e o espaço faz
          o trabalho sozinho.
        */}
        <ul className="mt-10 grid gap-x-8 gap-y-9 border-t border-background/15 pt-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {SERVICOS.map((s) => (
            <li
              key={s.titulo}
              className="lg:border-r lg:border-background/10 lg:pr-8 lg:last:border-r-0"
            >
              <h3 className="font-display text-base font-semibold">
                {s.titulo}
              </h3>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-escuro-muted">
                {s.texto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
