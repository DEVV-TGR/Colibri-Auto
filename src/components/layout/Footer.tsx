import { Logotipo } from "@/components/ui/Logotipo";
import Link from "next/link";
import { agencia } from "@/data/agencia";
import { enderecoLinha, stand, telHref } from "@/data/stand";

export function Footer() {
  return (
    /*
      O rodapé é a única faixa escura do site, e é de propósito.

      Num tema claro a página tem de acabar em alguma coisa — sem isto o
      conteúdo desvanecia em papel e o site parecia cortado a meio. E é o
      sítio onde o antracite do logótipo aparece em massa, o que fecha o par
      com o laranja da faixa lá em cima.

      Dentro de `.faixa-escura` o texto esbatido é o `--escuro-muted`: o
      `--muted` foi calibrado para o papel e aqui dava 2,8:1.
    */
    <footer className="faixa-escura">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logotipo altura="h-14" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-escuro-muted">
              {stand.slogan}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-laranja">
              Navegação
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-escuro-muted transition-colors hover:text-background">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/viaturas"
                  className="text-escuro-muted transition-colors hover:text-background"
                >
                  Stock
                </Link>
              </li>
              <li>
                <Link
                  href="/compramos"
                  className="text-escuro-muted transition-colors hover:text-background"
                >
                  Vender o meu carro
                </Link>
              </li>
              <li>
                <Link
                  href="/importamos"
                  className="text-escuro-muted transition-colors hover:text-background"
                >
                  Encomendar uma viatura
                </Link>
              </li>
              <li>
                <Link
                  href="/contactos"
                  className="text-escuro-muted transition-colors hover:text-background"
                >
                  Contactos
                </Link>
              </li>
              <li>
                {/* Obrigação legal: Decreto-Lei n.º 156/2005, alterado pelo
                    Decreto-Lei n.º 74/2017 — quem tem presença na Internet
                    divulga o acesso à plataforma em local visível.
                    TODO: substituir o texto pelo logótipo oficial, obtido em
                    livroreclamacoes.pt (não recriar), e confirmar com o
                    cliente que a empresa está registada na plataforma — o
                    link sem registo prévio não cumpre a obrigação. */}
                <a
                  href="https://www.livroreclamacoes.pt/inicio"
                  target="_blank"
                  rel="noopener"
                  className="text-escuro-muted transition-colors hover:text-background"
                >
                  Livro de Reclamações ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-laranja">
              Contactos
            </p>
            <ul className="mt-4 space-y-2 text-sm text-escuro-muted">
              <li>
                {enderecoLinha}
              </li>
              <li>
                <a
                  href={telHref(stand.telemovel)}
                  className="transition-colors hover:text-background"
                >
                  {stand.telemovel}
                </a>
                {" · "}
                <a
                  href={telHref(stand.telefone)}
                  className="transition-colors hover:text-background"
                >
                  {stand.telefone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${stand.email}`}
                  className="transition-colors hover:text-background"
                >
                  {stand.email}
                </a>
              </li>
              <li className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                <a
                  href={stand.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-background"
                >
                  WhatsApp ↗
                </a>
                <span className="text-laranja">·</span>
                <a
                  href={stand.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-background"
                >
                  Instagram ↗
                </a>
                {/*
                  O Facebook só aparece se existir. Não lhes foi encontrada
                  página, e `stand.facebook` está vazio — sem esta guarda o
                  `href=""` resolvia para a própria página e o rodapé oferecia
                  um link para lado nenhum em todas as rotas do site.
                */}
                {stand.facebook && (
                  <>
                    <span className="text-laranja">·</span>
                    <a
                      href={stand.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-background"
                    >
                      Facebook ↗
                    </a>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col items-center justify-center gap-1 text-xs text-escuro-muted sm:flex-row sm:gap-2.5">
          <Link
            href="/termos"
            className="transition-colors hover:text-background"
          >
            Termos e Condições
          </Link>
          <span aria-hidden className="hidden text-laranja sm:inline">
            ·
          </span>
          <Link
            href="/privacidade"
            className="transition-colors hover:text-background"
          >
            Política de Privacidade
          </Link>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-1 text-xs text-escuro-muted sm:flex-row sm:gap-2.5">
          <p>
            © {new Date().getFullYear()} {stand.nome}
          </p>
          <span aria-hidden className="hidden text-laranja sm:inline">
            ·
          </span>
          <p>
            Desenvolvido por{" "}
            <a
              href={agencia.url}
              target="_blank"
              rel="noreferrer"
              className="text-background transition-colors hover:text-laranja"
            >
              {agencia.nome} ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
