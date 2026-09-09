import type { Metadata } from "next";
import { CatalogoClient } from "@/components/catalogo/CatalogoClient";
import { openGraphRota, seoDescricao, seoTitulo } from "@/lib/seo";
import { getViaturas } from "@/lib/viaturas";

/*
  Esta página é um ficheiro estático, e é de propósito.

  Os filtros vivem no endereço, mas quem filtra é o browser — o
  `CatalogoClient` recebe o inventário inteiro e reduz a lista em memória. Ler
  os filtros no servidor obrigava a renderizar a página a cada visita, e com o
  inventário a vir da base de dados isso seria uma consulta ao Neon por
  visitante, na página mais visitada a seguir à homepage. Ver
  `docs/admin/07-tarefas-e-custos.md`.

  O `noindex` das variantes filtradas não desapareceu — passou a cabeçalho
  `X-Robots-Tag`, emitido pelo `next.config.ts` quando o endereço traz algum
  parâmetro de filtro. Faz falta: a grelha de marcas da homepage, as fichas de
  viatura e o próprio JSON-LD têm links para `/viaturas?marca=…`, e o Google
  segue-os.
*/

async function textos() {
  const total = (await getViaturas()).length;
  const plural = total === 1 ? "viatura" : "viaturas";
  return {
    titulo: seoTitulo(`${total} ${plural} usadas em Perafita`),
    descricao: seoDescricao(
      `Stock completo da Colibri Auto, em Perafita: ${total} ${plural} usadas com garantia incluída. Pesquise por marca, modelo, preço, ano e quilómetros.`,
    ),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { titulo, descricao } = await textos();

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: "/viaturas" },
    openGraph: openGraphRota({
      caminho: "/viaturas",
      titulo,
      descricao,
    }),
  };
}

export default async function ViaturasPage() {
  const viaturas = await getViaturas();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      {/*
        O cabeçalho segue a assinatura numerada das secções da home, mas com
        `<h1>` — aqui a listagem é a página, não uma secção dela. O contador
        vive na barra de filtros e no cabeçalho da grelha, e por isso não se
        repete no título: três sítios a dizer o mesmo número é onde eles
        começam a divergir.
      */}
      <header className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-sm text-laranja-deep">01</span>
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-laranja-deep to-laranja/20" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Stock
          </span>
        </div>
        <h1 className="font-display h-section text-ink">
          Está tudo <span className="font-extrabold text-laranja-deep">aqui</span>.
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
          O stock completo da Colibri Auto, com preço à vista. Filtre pelo que
          lhe interessa — e o que não estiver aqui, procuramos.
        </p>
      </header>
      <CatalogoClient viaturas={viaturas} />
    </div>
  );
}
