/*
  A lona, à largura do ecrã.

  Uma banda laranja de margem a margem, com `COMPRA · VENDA · RETOMA ·
  GARANTIA INCLUÍDA` a passar devagar em maiúsculas pesadas antracite. É
  literalmente a lona que está pendurada à porta do stand, e aparece no fundo
  de quase todas as fotografias do inventário.

  ## Isto quebra a regra 2 do sistema, e quebra-a de propósito

  «O laranja é cor de acção e realce; nunca preenche áreas grandes» — essa
  regra existe para impedir que o laranja se torne fundo por preguiça, e
  continua a valer em todo o lado menos aqui. Neste sítio a área laranja **é**
  a identidade: está à porta do stand em seis metros de lona, e é o que as
  pessoas reconhecem quando passam na avenida.

  **Uma banda, e só uma.** A segunda deixa de ser identidade e passa a ser um
  tema laranja — que é exactamente o que a regra impede. Se aparecer o pedido
  de uma segunda, a resposta é mudar esta de sítio.

  ## Porquê texto antracite

  Porque é o que o logótipo faz: «Colibri Auto» está escrito a antracite dentro
  do selo laranja. E porque o branco por cima deste laranja dá 2,6:1 e não
  passa contraste — ver o token `--laranja` em `globals.css`.
*/

const LEMA = [
  "Compra",
  "Venda",
  "Retoma",
  "Garantia incluída",
  "Financiamento",
] as const;

function Passagem({ duplicada }: { duplicada: boolean }) {
  return (
    <div
      aria-hidden={duplicada || undefined}
      className="flex shrink-0 items-center"
    >
      {LEMA.map((palavra) => (
        <span key={palavra} className="flex items-center">
          {/*
            A escala desceu de `text-2xl sm:text-4xl`: a esse corpo as palavras
            saíam cortadas nas duas pontas e a faixa lia-se como um banner mal
            medido.
          */}
          <span className="px-5 font-display text-lg font-extrabold uppercase tracking-[0.02em] text-ink sm:px-7 sm:text-2xl">
            {palavra}
          </span>
          {/* O losango é o separador do sistema, aqui à escala da faixa. */}
          <span className="text-lg text-ink/45 sm:text-xl">◆</span>
        </span>
      ))}
    </div>
  );
}

export function FaixaLona() {
  return (
    <section
      aria-label="Compra, venda e retoma"
      className="overflow-hidden bg-laranja py-3 sm:py-4"
    >
      {/*
        A fila é o lema duplicado e o deslocamento é de exactamente uma cópia —
        a mesma técnica da montra, sem a correcção da goteira, porque aqui as
        passagens estão encostadas e não há espaço entre elas.
      */}
      <div className="faixa-fila">
        <Passagem duplicada={false} />
        <Passagem duplicada />
      </div>
    </section>
  );
}
