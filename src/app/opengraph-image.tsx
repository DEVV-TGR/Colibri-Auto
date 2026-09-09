import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { enderecoLinha } from "@/data/stand";
import { OG_IMAGEM_PADRAO } from "@/lib/seo";

// alt e dimensões vêm da mesma constante que as páginas referenciam, para não
// haver duas versões da mesma verdade
export const alt = OG_IMAGEM_PADRAO.alt;
export const size = {
  width: OG_IMAGEM_PADRAO.width,
  height: OG_IMAGEM_PADRAO.height,
};
export const contentType = "image/png";

/**
 * Imagem de partilha da homepage (e de qualquer rota que não defina a sua).
 * Antes não existia nenhuma: partilhar o site no WhatsApp — o canal principal
 * de contacto deste stand — mostrava um cartão sem imagem.
 *
 * Sem fonte externa de propósito: o Montserrat só existe via next/font, e um
 * fetch a servidores de fontes no build é um ponto de falha desnecessário. A
 * marca aqui é o selo, e o resto segue a assinatura do site (maiúsculas com
 * tracking largo).
 *
 * As cores são os tokens de `globals.css` convertidos para sRGB — o satori não
 * interpreta `oklch()`. Ao mexer na paleta, mexer aqui também: esta imagem é o
 * que as pessoas veem quando o site é partilhado no WhatsApp, que é o canal
 * principal deste stand, e não há nada que avise quando fica dessincronizada.
 */
export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/logo/colibri-mark-md.png"),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          // --background
          background: "#F8F4F1",
          // lavagem laranja no canto superior direito, o eco da faixa da home
          backgroundImage:
            "radial-gradient(1100px 560px at 90% -12%, rgba(250,118,3,0.20), rgba(248,244,241,0) 70%)",
          borderBottom: "16px solid #FA7603",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <img
            src={`data:image/png;base64,${logo}`}
            alt=""
            width={342}
            height={180}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "#BD4600",
            }}
          >
            Compra · Venda · Retoma
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 62,
              fontWeight: 600,
              color: "#201D1B",
              lineHeight: 1.1,
            }}
          >
            Carros usados com garantia incluída · Perafita, Matosinhos
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              background: "#E2DBD5",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 26,
              fontSize: 25,
              color: "#69625B",
            }}
          >
            <div style={{ display: "flex" }}>
              {enderecoLinha}
            </div>
            <div style={{ display: "flex", color: "#BD4600" }}>
              colibriauto.pt
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
