import type { Metadata } from "next";
import { Abertura } from "@/components/home/Abertura";
import { ChamadaFinal } from "@/components/home/ChamadaFinal";
import { Destaques } from "@/components/home/Destaques";
import { Incluido } from "@/components/home/Incluido";
import { OndeEstamos } from "@/components/home/OndeEstamos";
import { FaixaLona } from "@/components/home/FaixaLona";
import { TresAcoes } from "@/components/home/TresAcoes";
import { getDestaques } from "@/lib/derivados";
import { openGraphRota, seoDescricao } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import { getViaturas } from "@/lib/viaturas";

const TITULO = `${SITE_NAME} — Stand de carros usados em Perafita, Matosinhos`;
const DESCRICAO = seoDescricao(
  "Stand de carros usados em Perafita, a dez minutos do Porto. Viaturas com garantia incluída no preço, financiamento e retoma. Avenida Maria Brito 3343, Matosinhos.",
);

export const metadata: Metadata = {
  // `absolute` para o sufixo do template não duplicar o nome da marca.
  title: { absolute: TITULO },
  description: DESCRICAO,
  alternates: { canonical: "/" },
  openGraph: openGraphRota({
    caminho: "/",
    titulo: TITULO,
    descricao: DESCRICAO,
  }),
};

export default async function Home() {
  const viaturas = await getViaturas();

  /*
    A ordem da página, e a razão de ser dela.

    **A pesquisa subiu para dentro da abertura.** Estava por baixo da faixa
    laranja, e a nota que aqui estava defendia-o: não pedir à pessoa que
    escolha marca e combustível antes de lhe termos mostrado um carro. O
    argumento cai com o tamanho do stock — com sete viaturas não há catálogo
    para explorar, há uma montra para filtrar, e quem chega quer é filtrar.
    É também o que faz o site que o cliente apontou como boa referência.

    Fica então: abertura (a frase, a pesquisa e a fotografia escurecida) → a
    faixa laranja, que é a lona real do stand e acrescenta a cor que a
    abertura escura não tem → e daí para baixo a lista numerada, do concreto
    para o abstracto: os carros (01), o que o stand faz (02), as condições
    (03), a morada (04).

    A chamada final fica fora da numeração de propósito — não é uma secção da
    montra, é a saída para quem não encontrou nada.
  */
  return (
    <>
      <Abertura viaturas={viaturas} />
      <FaixaLona />
      <Destaques destaques={getDestaques(viaturas)} />
      <TresAcoes />
      <Incluido viaturas={viaturas} />
      <OndeEstamos />
      <ChamadaFinal />
    </>
  );
}
