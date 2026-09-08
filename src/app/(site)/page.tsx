import type { Metadata } from "next";
import { CompramosOSeuCarro } from "@/components/home/CompramosOSeuCarro";
import { Destaques } from "@/components/home/Destaques";
import { GrelhaMarcas } from "@/components/home/GrelhaMarcas";
import { Hero } from "@/components/home/Hero";
import { SobreContactos } from "@/components/home/SobreContactos";
import { getDestaques } from "@/lib/derivados";
import { openGraphRota, seoDescricao } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import { getViaturas } from "@/lib/viaturas";

const TITULO = `${SITE_NAME} — Stand de carros usados em Perafita, Matosinhos`;
const DESCRICAO = seoDescricao(
  "Stand de carros usados em Perafita, a dez minutos do Porto. Viaturas com garantia incluída no preço, financiamento e retoma. Avenida Mário Brito 3343, Matosinhos.",
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

  return (
    <>
      <Hero viaturas={viaturas} />
      <Destaques destaques={getDestaques(viaturas)} />
      <GrelhaMarcas viaturas={viaturas} />
      <CompramosOSeuCarro />
      <SobreContactos />
    </>
  );
}
