import type { Viatura } from "@/lib/types";

/*
  O inventário estático — o que o site serve quando não há base de dados, que
  é o caso em desenvolvimento, no CI e nesta apresentação.

  **Origem dos dados.** Sete viaturas reais do stand, reconstruídas a partir
  das duas únicas fontes públicas que existem:

  - O **Ford Focus SW** vem do anúncio do Standvirtual, que é o único que a
    Colibri tem publicado. Traz ficha técnica completa (cerca de 95 atributos),
    descrição escrita pelo stand e 19 fotografias em 1600px. É por isso a
    viatura em melhor estado neste ficheiro, e a que se abre na demonstração.
  - As **outras seis** vêm das publicações do Instagram, onde as legendas dão
    versão, motor, potência, caixa, cor, quilómetros e preço. O que as legendas
    não dizem — matrícula, VIN, cor do interior, livro de revisões — está
    marcado como desconhecido em vez de inventado; ver `SEM_DADOS` abaixo.

  **O que falta, e é a única coisa que falta.** Estas seis têm uma fotografia
  cada, porque cada publicação do Instagram é uma imagem só. A grelha do
  catálogo não sofre com isso (um card mostra uma foto), mas a galeria da ficha
  fica curta. Assim que o cliente der as fotografias originais, é largar os
  ficheiros em `public/cars/<pasta>/` e subir o número em `fotos()`.
*/

function fotos(pasta: string, quantidade: number): string[] {
  return Array.from(
    { length: quantidade },
    (_, i) => `/cars/${pasta}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

/*
  O que não se sabe, escrito à vista.

  A matrícula e o VIN de seis destas viaturas não são públicos. A tentação era
  gerar uns com aspecto credível — e é precisamente o que não se pode fazer num
  site que vai ser mostrado ao dono das viaturas: ele conhece as matrículas de
  cor, e reconhece uma que não é dele mais depressa do que lê o título da
  página. Um traço diz "ainda não preenchemos isto"; um "AA-00-BB" diz "isto é
  falso", e põe em causa tudo o resto que lá está.

  A ficha técnica trata este valor como qualquer outro texto e mostra-o tal e
  qual. Preencher quando o cliente der os dados.
*/
const SEM_DADOS = "—";

export const viaturas: Viatura[] = [
  {
    id: "v-0001",
    marca: "Ford",
    marcaSlug: "ford",
    modelo: "Focus SW",
    modeloSlug: "focus-sw",
    versao: "1.0 EcoBoost S&S Titanium",
    preco: 4999,
    registoMes: 12,
    registoAno: 2014,
    quilometros: 201375,
    lugares: 5,
    portas: 5,
    segmento: "Carrinha",
    combustivel: "Gasolina",
    potenciaCv: 125,
    cilindradaCc: 998,
    transmissao: "Manual",
    cor: "Preto",
    corInterior: "Castanho",
    origem: "Importado",
    estado: "Usado",
    garantia: "18 meses",
    livroRevisoes: false,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("ford-focus-sw", 19),
    extras: [
      {
        categoria: "Multimédia",
        itens: [
          "Android Auto",
          "Sistema de navegação com ecrã táctil",
          "Bluetooth, mãos-livres e porta USB",
          "Carregamento wireless",
        ],
      },
      {
        categoria: "Conforto",
        itens: [
          "Climatização automática bi-zona",
          "Bancos desportivos à frente",
          "Volante em pele com comandos de rádio",
          "Sensor de chuva e sistema keyless",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "Câmara de marcha-atrás e sensores à frente e atrás",
          "Travagem de emergência autónoma e aviso de colisão",
          "Assistente de manutenção de faixa e reconhecimento de sinais",
          "ABS, ESP, controlo de tração e sete airbags",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 1.0 EcoBoost turbo de 125 cv",
          "Caixa manual de 6 velocidades",
          "Sistema Start/Stop",
          "Jantes de liga leve de 16''",
        ],
      },
    ],
    destaque: true,
    estadoVenda: "disponivel",
    ivaDedutivel: false,
    /*
      Descrição adaptada do próprio anúncio do Standvirtual — mesmos factos,
      sem os apelos à acção ("envie-nos uma mensagem e descubra o seu
      desconto") nem os avisos do portal, que aqui não fazem sentido: a pessoa
      já está no site do stand e o botão de contacto está ao lado.
    */
    descricao:
      "Ford Focus SW 1.0 EcoBoost Titanium de 2014, em preto, com cinco portas e cinco lugares. Motor 1.0 turbo gasolina de 125 cv com caixa manual de seis velocidades — a combinação que deu nome a esta motorização, por juntar consumos de citadino a uma carrinha de família. Versão Titanium, ou seja, com o equipamento todo: navegação, Android Auto, climatização bi-zona, câmara de marcha-atrás, keyless e assistente de faixa. Inspeção válida até junho de 2027 e garantia de 18 meses incluída no preço. Extra montado: espelho retrovisor com dashcam.",
  },
  {
    id: "v-0002",
    marca: "Mercedes-Benz",
    marcaSlug: "mercedes-benz",
    modelo: "E 350",
    modeloSlug: "e-350",
    versao: "Coupé 7G-Tronic",
    preco: 16990,
    registoMes: 6,
    registoAno: 2009,
    quilometros: 261345,
    lugares: 4,
    portas: 2,
    segmento: "Coupé",
    combustivel: "Diesel",
    potenciaCv: 231,
    cilindradaCc: 2987,
    transmissao: "Automática",
    cor: "Cinzento Metalizado",
    corInterior: "Preto (Pele)",
    origem: "Nacional",
    estado: "Usado",
    garantia: "12 meses",
    livroRevisoes: true,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("mercedes-e-350-coupe", 1),
    extras: [
      {
        categoria: "Multimédia",
        itens: [
          "Sistema de navegação Comand",
          "Bluetooth e mãos-livres",
          "Porta USB e entrada AUX",
        ],
      },
      {
        categoria: "Conforto",
        itens: [
          "Climatização automática",
          "Estofos em pele",
          "Bancos elétricos com memória",
          "Volante multifunções em pele",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "Sensores de estacionamento",
          "Airbags frontais, laterais e de cortina",
          "ABS e ESP",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 3.0 V6 turbo diesel de 231 cv",
          "Caixa automática 7G-Tronic",
          "Pack exterior desportivo",
          "Jantes de liga leve AMG",
        ],
      },
    ],
    destaque: true,
    estadoVenda: "disponivel",
    ivaDedutivel: false,
    descricao:
      "Mercedes-Benz E 350 Coupé de 2009, em cinzento metalizado com interior em pele preta. Motor 3.0 V6 turbo diesel de 231 cv e caixa automática 7G-Tronic — a combinação que fez a fama desta geração: força disponível a qualquer rotação e uma condução que nunca se sente apressada. Duas portas, quatro lugares, linhas de coupé e pack exterior desportivo com jantes AMG. É a viatura mais equipada do stock e a que menos se vê nesta gama de preço.",
  },
  {
    id: "v-0003",
    marca: "Renault",
    marcaSlug: "renault",
    modelo: "Kangoo",
    modeloSlug: "kangoo",
    versao: "1.5 dCi Confort S&S",
    preco: 11990,
    registoMes: 5,
    registoAno: 2019,
    quilometros: 127381,
    lugares: 3,
    portas: 4,
    segmento: "Carrinha",
    combustivel: "Diesel",
    potenciaCv: 90,
    cilindradaCc: 1461,
    transmissao: "Manual",
    cor: "Branco",
    corInterior: "Cinzento (Tecido)",
    origem: "Nacional",
    estado: "Usado",
    garantia: "12 meses",
    livroRevisoes: true,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("renault-kangoo", 1),
    extras: [
      {
        categoria: "Multimédia",
        itens: ["Rádio com Bluetooth", "Mãos-livres", "Porta USB"],
      },
      {
        categoria: "Conforto",
        itens: [
          "Ar condicionado",
          "Vidros elétricos",
          "Direção assistida",
          "Três lugares à frente",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "ABS e ESP",
          "Airbag do condutor e do passageiro",
          "Separador de carga",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 1.5 dCi de 90 cv",
          "Caixa manual de 5 velocidades",
          "Sistema Start/Stop",
          "Zona de carga com porta lateral de correr",
        ],
      },
    ],
    destaque: true,
    estadoVenda: "reservado",
    ivaDedutivel: true,
    descricao:
      "Renault Kangoo 1.5 dCi Confort de 2019, em branco, com três lugares e zona de carga com porta lateral de correr. Motor 1.5 dCi de 90 cv e caixa manual de cinco velocidades — o comercial ligeiro mais vendido do país, e por bons motivos: consumos baixos, mecânica conhecida por toda a gente e peças em qualquer lado. Com 127.381 km e o Start/Stop de série. IVA dedutível, o que para uma empresa muda o preço real de forma significativa.",
  },
  {
    id: "v-0004",
    marca: "Mazda",
    marcaSlug: "mazda",
    modelo: "CX-3",
    modeloSlug: "cx-3",
    versao: "1.5 SKYACTIV-D",
    preco: 11500,
    registoMes: 9,
    registoAno: 2015,
    quilometros: 146751,
    lugares: 5,
    portas: 5,
    segmento: "SUV",
    combustivel: "Diesel",
    potenciaCv: 105,
    cilindradaCc: 1499,
    transmissao: "Manual",
    cor: "Branco",
    corInterior: "Preto (Tecido)",
    origem: "Nacional",
    estado: "Usado",
    garantia: "12 meses",
    livroRevisoes: true,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("mazda-cx-3", 1),
    extras: [
      {
        categoria: "Multimédia",
        itens: [
          "Sistema MZD Connect com ecrã",
          "Bluetooth e mãos-livres",
          "Porta USB",
        ],
      },
      {
        categoria: "Conforto",
        itens: [
          "Climatização automática",
          "Volante multifunções",
          "Vidros elétricos",
          "Sensor de chuva",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "Sensores de estacionamento traseiros",
          "ABS, ESP e controlo de tração",
          "Airbags frontais, laterais e de cortina",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 1.5 SKYACTIV-D de 105 cv",
          "Caixa manual de 6 velocidades",
          "Jantes de liga leve",
        ],
      },
    ],
    destaque: true,
    estadoVenda: "disponivel",
    ivaDedutivel: false,
    descricao:
      "Mazda CX-3 1.5 diesel de 2015, em branco, com cinco portas e cinco lugares. Motor SKYACTIV-D de 105 cv e caixa manual — o SUV compacto que a Mazda desenhou quando decidiu que os seus carros deviam parecer todos feitos à mão, e que ainda hoje se distingue à distância. Com 146.751 km, posição de condução alta e consumos de citadino.",
  },
  {
    id: "v-0005",
    marca: "Volkswagen",
    marcaSlug: "volkswagen",
    modelo: "Golf",
    modeloSlug: "golf",
    versao: "1.6 TDI Trendline BlueMotion",
    preco: 9490,
    registoMes: 4,
    registoAno: 2013,
    quilometros: 286762,
    lugares: 5,
    portas: 5,
    segmento: "Citadino",
    combustivel: "Diesel",
    potenciaCv: 105,
    cilindradaCc: 1598,
    transmissao: "Manual",
    cor: "Preto",
    corInterior: "Preto (Tecido)",
    origem: "Nacional",
    estado: "Usado",
    garantia: "12 meses",
    livroRevisoes: true,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("vw-golf", 1),
    extras: [
      {
        categoria: "Multimédia",
        itens: ["Rádio com ecrã a cores", "Bluetooth e mãos-livres", "Porta USB e AUX"],
      },
      {
        categoria: "Conforto",
        itens: [
          "Ar condicionado",
          "Volante multifunções",
          "Vidros elétricos",
          "Computador de bordo",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "ABS, ESP e controlo de tração",
          "Airbags frontais, laterais e de cortina",
          "Fixações ISOFIX",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 1.6 TDI de 105 cv",
          "Caixa manual de 5 velocidades",
          "Tecnologia BlueMotion",
          "Jantes recentemente pintadas e tejadilho tratado",
        ],
      },
    ],
    destaque: false,
    estadoVenda: "disponivel",
    ivaDedutivel: false,
    descricao:
      "Volkswagen Golf 1.6 TDI BlueMotion de 2013, em preto, com cinco portas e cinco lugares. Motor 1.6 TDI de 105 cv com caixa manual e a afinação BlueMotion, feita para consumos — é a versão do Golf VII que se compra para fazer quilómetros. Tem 286.762 km, e é isso que explica o preço: mecanicamente é a unidade mais rodada do stock, e apresenta-se depois de uma passagem pela oficina com as jantes pintadas e o tejadilho tratado.",
  },
  {
    id: "v-0006",
    marca: "Renault",
    marcaSlug: "renault",
    modelo: "Captur",
    modeloSlug: "captur",
    versao: "1.5 dCi",
    preco: 8350,
    registoMes: 2,
    registoAno: 2015,
    quilometros: 200050,
    lugares: 5,
    portas: 5,
    segmento: "SUV",
    combustivel: "Diesel",
    potenciaCv: 90,
    cilindradaCc: 1461,
    transmissao: "Manual",
    cor: "Preto",
    corInterior: "Preto (Tecido)",
    origem: "Nacional",
    estado: "Usado",
    garantia: "12 meses",
    livroRevisoes: true,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("renault-captur", 1),
    extras: [
      {
        categoria: "Multimédia",
        itens: ["Rádio com Bluetooth", "Mãos-livres", "Porta USB e AUX"],
      },
      {
        categoria: "Conforto",
        itens: [
          "Ar condicionado",
          "Volante multifunções",
          "Vidros elétricos",
          "Banco traseiro deslizante",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "ABS, ESP e controlo de tração",
          "Airbags frontais e laterais",
          "Fixações ISOFIX",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 1.5 dCi de 90 cv",
          "Caixa manual de 5 velocidades",
          "Posição de condução elevada",
        ],
      },
    ],
    destaque: false,
    estadoVenda: "disponivel",
    ivaDedutivel: false,
    descricao:
      "Renault Captur 1.5 dCi de 2015, em preto, com cinco portas e cinco lugares. O 1.5 dCi de 90 cv é o motor diesel mais difundido da Europa e faz aqui o que faz sempre: consumos baixos e manutenção barata. Crossover compacto, com posição de condução alta e banco traseiro deslizante — o carro certo para quem quer a praticidade de um SUV sem o tamanho de um. Com 200.050 km.",
  },
  {
    id: "v-0007",
    marca: "Mercedes-Benz",
    marcaSlug: "mercedes-benz",
    modelo: "B 150",
    modeloSlug: "b-150",
    versao: "Autotronic",
    preco: 6490,
    registoMes: 7,
    registoAno: 2006,
    quilometros: 219975,
    lugares: 5,
    portas: 5,
    segmento: "Berlina",
    combustivel: "Gasolina",
    potenciaCv: 95,
    cilindradaCc: 1498,
    transmissao: "Automática",
    cor: "Cinzento Metalizado",
    corInterior: "Bege (Tecido)",
    origem: "Nacional",
    estado: "Usado",
    garantia: "12 meses",
    livroRevisoes: true,
    segundaChave: true,
    classePortagem: "Classe 1",
    matricula: SEM_DADOS,
    vin: SEM_DADOS,
    fotos: fotos("mercedes-b-150", 1),
    extras: [
      {
        categoria: "Multimédia",
        itens: ["Rádio de origem", "Entrada AUX"],
      },
      {
        categoria: "Conforto",
        itens: [
          "Ar condicionado",
          "Vidros elétricos",
          "Volante multifunções",
          "Banco traseiro rebatível",
        ],
      },
      {
        categoria: "Segurança",
        itens: [
          "ABS e ESP",
          "Airbags frontais, laterais e de cortina",
          "Fixações ISOFIX",
        ],
      },
      {
        categoria: "Performance",
        itens: [
          "Motor 1.5 gasolina de 95 cv",
          "Caixa automática Autotronic (CVT)",
          "Direção assistida",
        ],
      },
    ],
    destaque: false,
    estadoVenda: "vendido",
    ivaDedutivel: false,
    descricao:
      "Mercedes-Benz B 150 Autotronic de 2006, em cinzento metalizado. Motor 1.5 gasolina de 95 cv com caixa automática de variação contínua — um automático a este preço é raro, e é essa a razão de existir deste carro. Monovolume compacto por fora e surpreendentemente espaçoso por dentro, na altura em que a Mercedes ainda desenhava a Classe B como um carro alto. Com 219.975 km.",
  },
];
