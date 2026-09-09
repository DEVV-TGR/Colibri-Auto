import type { Metadata } from "next";
import { Abertura } from "@/components/home/Abertura";
import { BarraPesquisa } from "@/components/home/BarraPesquisa";
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

    Abertura → lona → pesquisa é uma sequência deliberada: diz-se a frase com a
    montra ao lado, diz-se o que se faz, e só depois se oferece uma forma de
    filtrar. O sistema de origem punha a pesquisa dentro do hero, antes de a
    pessoa ter visto uma única viatura — pedia-lhe para escolher marca e
    combustível sem lhe ter mostrado nada.

    A abertura já traz as três naturezas de uma vez — tipografia à esquerda,
    fotografia à direita — e a faixa acrescenta a cor. Houve uma versão com
    duas filas de miniaturas a deslizar entre as duas; saíram, e o porquê está
    em `Abertura.tsx`.

    Depois disso a página é uma lista numerada, do concreto para o abstracto:
    os carros (01), o que o stand faz (02), as condições (03), a morada (04). A
    chamada final fica fora da numeração de propósito — não é uma secção da
    montra, é a saída para quem não encontrou nada.
  */
  return (
    <>
      <Abertura viaturas={viaturas} />
      <FaixaLona />
      <BarraPesquisa viaturas={viaturas} />
      <Destaques destaques={getDestaques(viaturas)} />
      <TresAcoes />
      <Incluido viaturas={viaturas} />
      <OndeEstamos />
      <ChamadaFinal />
    </>
  );
}
