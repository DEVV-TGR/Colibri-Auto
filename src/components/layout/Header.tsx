"use client";

import { Logotipo } from "@/components/ui/Logotipo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { stand, telHref } from "@/data/stand";

const ligacoes = [
  { href: "/", rotulo: "Início" },
  { href: "/viaturas", rotulo: "Stock" },
  { href: "/compramos", rotulo: "Vender o meu" },
  { href: "/importamos", rotulo: "Encomendar" },
  { href: "/contactos", rotulo: "Contactos" },
];

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  /*
    O cabeçalho não tem fundo enquanto se está no topo.

    Tinha `bg-background/70` sempre, e isso era invisível enquanto a página
    inteira era de papel. Deixou de ser quando a home passou a abrir com uma
    imagem de ecrã inteiro: uma barra de papel translúcido por cima dela lê-se
    como uma tira colada ao topo, com uma linha dura por baixo — uma costura
    onde não devia haver nenhuma.

    A resposta não é pintar o cabeçalho de branco, que só mudava a costura de
    página: é não ter fundo nenhum enquanto não for preciso. Ele só existe para
    o texto se ler quando houver conteúdo a passar por baixo, e no topo não há.

    Arranca transparente também no servidor, que é o estado certo para quem
    abre a página de raiz. Se o browser restaurar a posição do scroll, o efeito
    corrige no primeiro fotograma.
  */
  const [noTopo, setNoTopo] = useState(true);

  /*
    A home abre com uma fotografia escura de ecrã inteiro, e o cabeçalho fica
    por cima dela. Com os tokens do tema claro — `text-muted`, `text-ink`, as
    barras pretas do menu — não se lia nada.

    O sinal é «estou no topo **da home**», e não «estou no topo»: nas outras
    rotas o primeiro ecrã é papel, e lá o texto claro é que desaparecia. Assim
    que se rola, o cabeçalho ganha o fundo de papel e volta tudo ao normal —
    é por isso que `sobreEscuro` depende do `noTopo` e não só do `pathname`.

    Se um dia outra rota abrir com uma secção escura, esta condição é o sítio
    onde isso se diz.
  */
  const sobreEscuro = pathname === "/" && noTopo && !aberto;

  useEffect(() => {
    const aoRolar = () => setNoTopo(window.scrollY <= 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  /*
    Com o menu a ocupar o ecrã, o que está por trás não deve deslizar — e o
    Escape tem de o fechar, que é o que qualquer pessoa tenta primeiro.

    Este efeito não chama `setState` de forma síncrona: mexe no DOM e regista
    um ouvinte. É a distinção que a regra do React 19 faz, e a razão de este
    passar onde os outros não passavam.
  */
  useEffect(() => {
    if (!aberto) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  /*
    Clicar num link para a página onde já se está.

    Um `<Link>` não tem para onde navegar nesse caso, e o clique fica sem
    resposta nenhuma — quem carrega no logótipo a meio da home espera voltar
    ao topo e não acontece nada. Passa a subir.

    A excepção é o endereço trazer filtros (`/viaturas?marca=…`): aí o clique
    ainda significa alguma coisa — voltar ao catálogo sem filtros — e deixa-se
    navegar como até aqui.

    `scrollTo(0, 0)` sem opções herda o `scroll-behavior` do CSS: suave para
    quem quer movimento, instantâneo para quem pediu `prefers-reduced-motion`
    em `globals.css`. Passar `behavior: "smooth"` aqui atropelava essa escolha.
  */
  const jaAqui = (href: string) =>
    pathname === href && window.location.search === "";

  const aoClicar = (href: string) => (e: React.MouseEvent) => {
    if (!jaAqui(href)) return;
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  /*
    No telemóvel o menu fecha-se e a página sobe — por esta ordem, e não ao
    contrário. Enquanto o menu está aberto o `body` tem `overflow: hidden`, e
    um `scrollTo` contra um body bloqueado não vai a lado nenhum.

    Daí a subida ficar aqui e não no `onClick`: quando este efeito corre, o
    cleanup do efeito acima já devolveu o `overflow` ao que era.
  */
  const subirAoFechar = useRef(false);

  useEffect(() => {
    if (aberto || !subirAoFechar.current) return;
    subirAoFechar.current = false;
    window.scrollTo(0, 0);
  }, [aberto]);

  const aoClicarNoMenu = (href: string) => (e: React.MouseEvent) => {
    if (jaAqui(href)) {
      e.preventDefault();
      subirAoFechar.current = true;
    }
    setAberto(false);
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        aberto || !noTopo
          ? "border-line/60 bg-background/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label={stand.nome}
          onClick={aoClicar("/")}
          /*
            A cor tem de vir daqui. O `Logotipo` não declara cor nenhuma de
            propósito — a palavra «COLIBRI AUTO» herda a do contexto, que é o
            que a faz sair antracite no cabeçalho e clara no rodapé. Sobre a
            fotografia da abertura o contexto é escuro, e sem isto o wordmark
            ficava antracite sobre antracite e desaparecia.
          */
          className={`flex items-center transition-colors duration-300 ${
            sobreEscuro ? "text-background" : ""
          }`}
        >
          <Logotipo altura="h-10" prioridade />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Principal">
          {ligacoes.map((l) => {
            /*
              A `/` só acende em `/`; as outras acendem também nas suas
              subpáginas. Antes isto estava escrito com o `/viaturas` lá
              dentro, e cada rota nova entrava sem realce nenhum.
            */
            const ativo =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={aoClicar(l.href)}
                className={`text-sm tracking-wide transition-colors ${
                  ativo
                    ? sobreEscuro
                      ? "text-laranja-bright"
                      : "text-laranja-deep"
                    : sobreEscuro
                      ? "text-background/75 hover:text-background"
                      : "text-muted hover:text-ink"
                }`}
              >
                {l.rotulo}
              </Link>
            );
          })}
          <a
            href={telHref(stand.telemovel)}
            className={`press rounded-full border border-laranja px-5 py-2 text-sm tracking-wide ${
              sobreEscuro
                ? "text-background hover:text-laranja-bright"
                : "text-ink hover:text-laranja-deep"
            }`}
          >
            Fale connosco
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="press flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 transition-transform ${sobreEscuro ? "bg-background" : "bg-ink"} ${aberto ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 transition-transform ${sobreEscuro ? "bg-background" : "bg-ink"} ${aberto ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

    </header>

    {/*
      O menu é um card ao centro, não um painel colado ao cabeçalho.

      Antes empurrava o conteúdo e deixava metade da página a espreitar por
      baixo, o que faz o menu parecer um acidente em vez de uma escolha. Agora
      o fundo escurece e o que se lê é só o que há para escolher — mas o card
      mantém a página presente por trás, que é o que diz a quem o abriu que
      não saiu de lado nenhum.

      **E vive fora do `<header>`**, o que parece detalhe e não é: o cabeçalho
      tem `backdrop-blur`, e um elemento com `backdrop-filter` passa a ser o
      bloco de contenção dos descendentes `fixed`. Lá dentro, o `inset-0`
      media-se contra o cabeçalho — 390×64 em vez do ecrã inteiro.
    */}
    {aberto && (
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-6 md:hidden"
        role="dialog"
        aria-modal
        aria-label="Menu"
      >
        {/* Fechar tocando fora — o gesto que toda a gente tenta primeiro. */}
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setAberto(false)}
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        />

        <nav className="relative z-10 w-full max-w-xs rounded-2xl border border-line bg-surface px-8 py-10 shadow-2xl shadow-black/60">
          <ul className="flex flex-col items-center gap-6">
            {ligacoes.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={aoClicarNoMenu(l.href)}
                  className="press font-display text-3xl text-ink transition-colors hover:text-laranja-deep"
                >
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hairline mx-auto my-7 w-20" />

          <a
            href={telHref(stand.telemovel)}
            onClick={() => setAberto(false)}
            className="press block text-center text-xs uppercase tracking-[0.2em] text-laranja-deep"
          >
            Fale connosco
            <span className="mt-2 block text-lg normal-case tracking-normal text-ink">
              {stand.telemovel}
            </span>
          </a>
        </nav>
      </div>
    )}
    </>
  );
}
