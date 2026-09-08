/**
 * Identidade do site em produção. Fonte de verdade única para tudo o que é
 * metadata: `metadataBase`, canonicals, sitemap, robots e JSON-LD.
 *
 * ⚠️ **O domínio ainda não está fechado com o cliente.** `colibriauto.pt` é o
 * que aqui está e é o que se propõe — mas nada o confirma, e enquanto assim
 * for este é o valor mais perigoso do repositório: entra no `metadataBase`, e
 * um `metadataBase` que aponta para um domínio que não existe faz com que
 * todas as partilhas em WhatsApp e Facebook peçam a imagem a um sítio morto e
 * apareçam sem imagem nenhuma. Não é um erro que se veja no site.
 *
 * Assim que houver domínio: mudar aqui, e só aqui.
 */
export const SITE_URL = "https://www.colibriauto.pt";

/**
 * Grafia correta, usada em metadata, JSON-LD e texto visível.
 *
 * O logótipo diz "Colibri Auto" com "STAND" por baixo, em caixa alta e
 * espaçado — é uma linha de assinatura do selo, não parte do nome. O nome é
 * "Colibri Auto"; a razão social é "Colibri Auto, Lda." e essa só aparece no
 * rodapé e nas páginas legais.
 */
export const SITE_NAME = "Colibri Auto";

/**
 * Localidade do stand — entra em titles e descriptions por ser negócio local.
 *
 * Perafita e não "Porto", apesar de o Porto ter muito mais procura. Quem
 * pesquisa "stand de carros Porto" não vai a Perafita por causa do title; quem
 * pesquisa "stand Matosinhos" ou "carros usados Perafita" vai, e é essa a
 * pessoa que entra pela porta. A proximidade ao Porto diz-se no texto das
 * páginas, onde não custa posições.
 */
export const SITE_LOCALIDADE = "Perafita";

/** Caminho relativo → URL absoluto. JSON-LD e sitemap não aceitam relativos. */
export function urlAbsoluto(caminho: string): string {
  return new URL(caminho, SITE_URL).toString();
}
