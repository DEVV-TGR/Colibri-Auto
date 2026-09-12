export const stand = {
  nome: "Colibri Auto",
  /**
   * A linha do próprio letreiro à porta do stand. Não se inventou nada: está
   * pintada na lona laranja que aparece no fundo de metade das fotografias do
   * inventário, e é a promessa que eles já fazem a quem passa na Avenida.
   */
  slogan: "Compra · Venda · Retoma",
  /*
    "Maria" e não "Mário". O perfil do Standvirtual — de onde vieram estes
    dados — escreve "Avenida Mário Brito", e está errado: o Instagram deles, o
    Google e o próprio cliente dizem Maria. Quem precisa de correcção é o
    portal, não o site. Está na lista de `docs/por-confirmar.md`.
  */
  morada: "Avenida Maria Brito 3343",
  codigoPostal: "4455-495",
  localidade: "Perafita",
  distrito: "Porto",
  pais: "PT",
  /** O número de secretária, o que está no letreiro em primeiro lugar. */
  telefone: "912 458 400",
  telefoneNota: "Chamada para a rede móvel nacional",
  /** O número que atende WhatsApp — é por aqui que chega quase tudo. */
  telemovel: "928 492 602",
  telemovelNota: "Chamada para a rede móvel nacional",
  email: "geral.colibrilda@gmail.com",
  instagram: "https://www.instagram.com/colibriauto_stand/",
  /**
   * ⚠️ Não lhes foi encontrada página de Facebook. Fica vazio de propósito, e
   * não com um link inventado: o `facebook` entra no `sameAs` do JSON-LD, que
   * é onde o Google liga o site à entidade, e um `sameAs` que dá 404 estraga
   * exactamente aquilo que devia provar. O rodapé e o JSON-LD já sabem lidar
   * com a string vazia. Pedir ao cliente, e preencher.
   */
  facebook: "",
  // WhatsApp: abre direto a conversa (+351 928 492 602)
  whatsapp: "https://wa.me/351928492602",
  mapsUrl: "https://maps.google.com/?q=Avenida+Maria+Brito+3343+4455-495+Perafita",
  /**
   * ⚠️ **Horário por confirmar.** O perfil do Standvirtual tem os sete dias
   * marcados como fechados (ou seja, nunca foi preenchido) e o Instagram não o
   * diz em lado nenhum. O que está aqui é o horário típico de um stand da
   * zona, e serve para o site não ter um buraco na apresentação — mas alimenta
   * o `openingHours` do JSON-LD, que é o que o Google mostra na ficha do
   * Maps. Ou seja: isto está a dizer ao Google horas que ninguém confirmou.
   * Confirmar na reunião e corrigir antes de qualquer coisa ir para o ar.
   *
   * A forma estruturada tem os dias em inglês porque é o que o schema.org
   * exige. O texto visível é derivado daqui por `horasTexto()` — antes eram
   * duas listas e havia o risco de o site dizer uma coisa e o JSON-LD outra.
   */
  horarios: [
    {
      dias: "Segunda a Sexta",
      diasSchema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      periodos: [
        ["09:00", "13:00"],
        ["14:00", "19:00"],
      ],
    },
    {
      dias: "Sábado",
      diasSchema: ["Saturday"],
      periodos: [["09:00", "13:00"]],
    },
    { dias: "Domingo", diasSchema: ["Sunday"], periodos: [] },
  ],
  sobre: [
    /*
      A oração «escolhidas pelo estado em que estão e não pela etiqueta que
      têm» saiu daqui e subiu para título da `Promessa`, no primeiro ecrã. É a
      melhor frase que o cliente escreveu sobre o stand e estava a passar
      despercebida a meio de um parágrafo na secção da morada.

      Fica registado em `docs/por-confirmar.md`: **isto é uma edição a texto do
      cliente**, não uma correcção. Se ele quiser o parágrafo tal como o
      escreveu, repõe-se — e nesse caso a `Promessa` passa a precisar de outro
      título, senão a mesma frase aparece duas vezes na mesma página.
    */
    "A Colibri Auto é um stand de bairro, em Perafita, a dez minutos do Porto. Trabalhamos com viaturas usadas de utilização real — famílias, trabalho, quilómetros. Todas saem daqui com garantia incluída no preço.",
    "Compramos, vendemos e aceitamos retoma. Se já tem carro, avaliamo-lo e abatemos o valor no próximo; se precisar de financiamento, tratamos disso consigo. Sem letra pequena e sem pressa — o carro fica cá até ser o carro certo.",
  ],
} as const;

/**
 * A morada numa linha, tal como aparece no rodapé, na secção de contactos e
 * na imagem de partilha. Existe para que as três não possam divergir: um NAP
 * inconsistente entre o site e o Perfil de Empresa custa posições no Maps.
 */
export const enderecoLinha = `${stand.morada}, ${stand.codigoPostal} ${stand.localidade}`;

/** Número em E.164, o formato que o `tel:` e o JSON-LD esperam. */
export function telE164(numero: string): string {
  return `+351${numero.replaceAll(" ", "")}`;
}

/** `href` de chamada. Estava escrito à mão em cinco componentes. */
export function telHref(numero: string): string {
  return `tel:${telE164(numero)}`;
}

/** Horário de um dia em texto: "09:00 – 13:00 · 14:00 – 19:00" ou "Encerrado". */
export function horasTexto(dia: (typeof stand.horarios)[number]): string {
  if (dia.periodos.length === 0) return "Encerrado";
  return dia.periodos.map(([abre, fecha]) => `${abre} – ${fecha}`).join(" · ");
}
