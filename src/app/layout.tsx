import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { SUFIXO_TITULO } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/*
  O layout de raiz, e só o que tem mesmo de ser de raiz.

  O `<html>`, as fontes, o CSS global e a metadata base — porque o Next exige
  que existam aqui, e porque valem para tudo o que a aplicação sirva.

  **O chrome do site não vive aqui.** Header, Footer, CTA flutuante, preloader
  e transições de rota mudaram-se para `(site)/layout.tsx`, onde só os apanha
  quem pertence ao site público. O painel `/admin` é outro produto na mesma
  aplicação: é uma ferramenta, não uma montra, e herdar a encenação do site
  seria tão errado como o site herdar a densidade do painel.
*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
  A fonte dos títulos.

  O sistema de origem usava Bodoni Moda — um Didone, escolha certa para um
  stand que se vendia como premium. A Colibri não se vende assim: o logótipo é
  um grotesco geométrico pesado dentro de um selo redondo, e a promessa é
  "compra · venda · retoma", não exclusividade. Um Didone por cima disso lia-se
  como a assinatura de outra empresa.

  Montserrat, porque é o desenho comercialmente disponível mais próximo do
  lettering do selo: mesma construção geométrica, mesmo `a` de dois andares,
  mesmas maiúsculas largas. Só os pesos que se usam — 600 para os títulos e 800
  para a palavra destacada; carregar a família toda seriam 300 kB para nada.

  Sem itálico: em Montserrat é um oblíquo sintético, e o realce dos títulos
  passou a fazer-se por peso e cor, que é como um grotesco o faz.
*/
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Stand de carros usados em Perafita, Matosinhos`,
    template: `%s${SUFIXO_TITULO}`,
  },
  description:
    "Stand de carros usados em Perafita, a dez minutos do Porto. Viaturas com garantia incluída no preço, financiamento e retoma. Avenida Mário Brito 3343, Matosinhos.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "pt_PT",
    type: "website",
  },
  // `summary_large_image` em todas as páginas: as fotos das viaturas são o
  // conteúdo, e um cartão pequeno desperdiça-as. Antes divergia por página.
  twitter: { card: "summary_large_image" },
  // O canonical é declarado rota a rota, nunca aqui: um canonical herdado do
  // layout apontaria todas as páginas filhas para "/".
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
