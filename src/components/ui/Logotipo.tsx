import Image from "next/image";
import { stand } from "@/data/stand";

/*
  O logótipo, como ele existe fora do ecrã.

  A Colibri não tem um wordmark: tem um **selo redondo** — laranja, com a
  silhueta de um carro, "Colibri Auto" e "STAND" lá dentro. Um selo assim,
  sozinho a 40px na barra de navegação, deixa de se ler: as duas linhas de
  texto dentro do círculo fecham-se e o que fica é uma bola cor de laranja
  indistinguível de um favicon.

  A solução não se inventou aqui — está na lona à porta do stand, que é onde a
  marca já resolveu este problema: o selo à esquerda e **COLIBRI AUTO** em
  maiúsculas pesadas ao lado. É esse par que se reproduz.

  Em ecrãs estreitos fica só o selo. Aí não é decoração — é o botão de voltar
  ao início, e a palavra ao lado roubava metade da barra a quem tem 360px de
  largura. O `aria-label` do link que envolve isto trata do nome para quem não
  vê a imagem, e o `alt` fica vazio de propósito para o nome não ser anunciado
  duas vezes.
*/
export function Logotipo({
  altura = "h-10",
  prioridade = false,
}: {
  /** Classe de altura do selo. A palavra ao lado escala com ela. */
  altura?: string;
  prioridade?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/logo/colibri-mark-sm.png"
        alt=""
        width={220}
        height={220}
        priority={prioridade}
        className={`${altura} w-auto`}
      />
      <span className="hidden font-display text-[0.95em] font-extrabold uppercase leading-none tracking-[0.06em] text-ink sm:block">
        {stand.nome}
      </span>
    </span>
  );
}
