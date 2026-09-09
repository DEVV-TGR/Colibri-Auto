/*
  Verifica o contraste dos pares de cor que o site usa a sério.

  Existe por causa da passagem ao tema claro. Num tema escuro quase tudo passa
  por acidente — texto claro sobre preto tem contraste de sobra —, e a intuição
  de quem escolhe as cores raramente falha. Num tema claro falha, e falha
  exactamente onde dói: o laranja da marca sobre branco dá **2,6:1** e parece
  perfeitamente legível a quem tem um bom monitor num escritório com luz.

  Foi essa medição que decidiu a regra central da paleta — o laranja é cor de
  mancha e não cor de letra, com antracite por cima. Este script existe para
  que a regra não se perca: quem mexer nos tokens de `globals.css` e esquecer o
  porquê, vê o build falhar.

      npm run check:contraste

  Lê os valores de `globals.css` em vez de os repetir aqui. Uma cópia dos
  tokens neste ficheiro divergiria do sistema no primeiro ajuste, e um teste
  que valida uma cópia não valida nada.
*/

import { readFile } from "node:fs/promises";
import { join } from "node:path";

const MINIMO = 4.5; // WCAG AA para texto normal
const MINIMO_GRANDE = 3; // AA para texto >= 24px ou >= 18.66px a bold

/** Pares que o site usa mesmo, com o mínimo que cada um tem de cumprir. */
const PARES = [
  ["ink", "background", MINIMO, "texto principal sobre o papel"],
  ["ink", "surface", MINIMO, "texto principal dentro de um card"],
  ["muted", "background", MINIMO, "texto secundário sobre o papel"],
  ["muted", "surface", MINIMO, "texto secundário dentro de um card"],
  ["muted", "areia", MINIMO, "texto secundário sobre a lavagem laranja"],
  ["ink", "laranja", MINIMO, "texto dos botões e etiquetas de preço"],
  ["ink", "laranja-bright", MINIMO, "o mesmo, no fim do degradê e no hover"],
  ["laranja-deep", "background", MINIMO, "laranja em texto, links e o nº da secção"],
  ["laranja-deep", "surface", MINIMO, "o mesmo, dentro de um card"],
  ["sucesso", "background", MINIMO, "estado disponível, no painel"],
  ["erro", "background", MINIMO, "mensagens de erro dos formulários"],
  ["muted", "vendido", MINIMO, "texto do badge «Vendido»"],
  ["background", "escuro", MINIMO, "texto do rodapé"],
  ["escuro-muted", "escuro", MINIMO, "texto secundário do rodapé"],
  ["laranja", "escuro", MINIMO_GRANDE, "os títulos de coluna do rodapé"],
];

function oklchParaSrgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((c) => Math.min(1, Math.max(0, c)));
}

/** Luminância relativa, a definição da WCAG. Recebe já linear. */
function luminancia([r, g, b]) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function racio(a, b) {
  const la = luminancia(oklchParaSrgb(...a));
  const lb = luminancia(oklchParaSrgb(...b));
  const [alto, baixo] = la > lb ? [la, lb] : [lb, la];
  return (alto + 0.05) / (baixo + 0.05);
}

/** Lê `--nome: oklch(L C H);` do `:root` de globals.css. */
async function lerTokens() {
  const css = await readFile(join(process.cwd(), "src/app/globals.css"), "utf8");
  const tokens = new Map();
  const re = /--([a-z-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    tokens.set(m[1], [Number(m[2]), Number(m[3]), Number(m[4])]);
  }
  return tokens;
}

const tokens = await lerTokens();
let falhas = 0;
let emFalta = 0;

console.log(`Contraste — ${PARES.length} pares, lidos de src/app/globals.css\n`);

for (const [frente, fundo, minimo, nota] of PARES) {
  const a = tokens.get(frente);
  const b = tokens.get(fundo);
  if (!a || !b) {
    console.log(`  ?  ${frente} / ${fundo} — token não encontrado`);
    emFalta++;
    continue;
  }
  const r = racio(a, b);
  const passa = r >= minimo;
  if (!passa) falhas++;
  console.log(
    `  ${passa ? "ok  " : "FALHA"} ${`${frente} / ${fundo}`.padEnd(34)} ${r
      .toFixed(2)
      .padStart(5)} : 1   (mín. ${minimo})  ${nota}`,
  );
}

if (falhas || emFalta) {
  console.error(
    `\n${falhas} par(es) abaixo do mínimo, ${emFalta} token(s) em falta.`,
  );
  process.exit(1);
}

console.log("\nTodos os pares passam.");
