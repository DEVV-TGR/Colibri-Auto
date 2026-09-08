import { enderecoLinha, horasTexto, stand, telHref } from "@/data/stand";

const ligacaoExterna =
  "press inline-flex rounded-full border border-laranja/40 px-5 py-2.5 text-sm text-creme hover:border-laranja hover:text-laranja-bright";

/**
 * Morada, telefones, horário e redes. Vive num componente próprio porque
 * aparece em dois sítios — na secção da homepage e na página /contactos — e
 * duas cópias do NAP acabariam por divergir.
 */
export function DadosContacto() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-laranja">
        Onde estamos
      </p>
      <p className="mt-4 font-display text-2xl text-ink">{stand.nome}</p>
      <p className="mt-1 text-sm text-muted">{enderecoLinha}</p>

      <div className="mt-5 space-y-1 text-sm">
        <p>
          <a
            href={telHref(stand.telefone)}
            className="text-creme transition-colors hover:text-laranja-bright"
          >
            {stand.telefone}
          </a>{" "}
          <span className="text-xs text-muted">({stand.telefoneNota})</span>
        </p>
        <p>
          <a
            href={telHref(stand.telemovel)}
            className="text-creme transition-colors hover:text-laranja-bright"
          >
            {stand.telemovel}
          </a>{" "}
          <span className="text-xs text-muted">({stand.telemovelNota})</span>
        </p>
        <p>
          <a
            href={`mailto:${stand.email}`}
            className="text-creme transition-colors hover:text-laranja-bright"
          >
            {stand.email}
          </a>
        </p>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.2em] text-laranja">Horário</p>
        <ul className="mt-3 max-w-sm space-y-1.5 text-sm text-muted">
          {stand.horarios.map((h) => (
            <li key={h.dias} className="flex justify-between gap-4">
              <span>{h.dias}</span>
              <span className="text-ink">{horasTexto(h)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href={stand.mapsUrl} target="_blank" rel="noreferrer" className={ligacaoExterna}>
          Abrir no Google Maps ↗
        </a>
        <a href={stand.whatsapp} target="_blank" rel="noreferrer" className={ligacaoExterna}>
          WhatsApp ↗
        </a>
        <a href={stand.instagram} target="_blank" rel="noreferrer" className={ligacaoExterna}>
          Instagram ↗
        </a>
        {/* Ver a nota no rodapé: sem página de Facebook, o botão não existe. */}
        {stand.facebook && (
          <a href={stand.facebook} target="_blank" rel="noreferrer" className={ligacaoExterna}>
            Facebook ↗
          </a>
        )}
      </div>
    </div>
  );
}
