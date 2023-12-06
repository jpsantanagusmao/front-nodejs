export interface culturModel {
  cultura: string,
  fonte: string, //Fonte (link ou referência) da fonte desta informação
  v: number,
  produtividade: produtividadeModel[]

}
export interface produtividadeModel {
  producao: number,
  unidade: string,
  n: number,
  nCobertura: number,
  p: N_P[],
  k: N_K[]
}
export interface N_P {
  baixo: number,
  medio: number,
  alto: number,
}
export interface N_K {
  baixo: number,
  medio: number,
  alto: number,
}

export const CULTURAS = [

  {
    cultura: 'Amendoim',
    v: 60,
    produtividade: [
      {
        producao: 1800,
        unidade: 'kg',
        n: 10,
        nCobertura: 0,
        p: [
          {
            baixo: 80,
            medio: 60,
            alto: 40
          }
        ],
        k: [
          {
            baixo: 60,
            medio: 40,
            alto: 20
          }
        ]
      }
    ],
  },
  {
    cultura: 'Mombaça - formação',
    fonte: [
      'https://www.infoteca.cnptia.embrapa.br/bitstream/doc/984110/1/RT27pastagem.pdf',
      'https://ainfo.cnptia.embrapa.br/digital/bitstream/item/53861/1/rt87-pastagem-panicummaximum.pdf'
    ],
    recomendacoes: [
      'A adubação nitrogenada deve ser aplicada anualmente, parcelada em três a quatro aplicações, durante o período chuvoso em intervalos de 30 a 45 dias.',
      'A uréia pode ser aplicada em cobertura, durante o período chuvoso, tendo-se a precaução de aplicá-la em solo seco.',
      'Sulfato e amônio por conter enxofre ou nitrato e amônio por serem menos susceptíveis às perdas de nitrogênio por volatilização, são as mais indicadas para a adubação em cobertura.',
      'Aplicar 30 kg/ha de enxofre e 30 a 40 kg/ha de uma fórmula de FTE que contenha cobre, zinco, boro e molibdênio.',
      'As perdas de nitrogênio da uréia por volatilização são imprevisíveis e podem até não ocorrer ou serem mínimas, notadamente se chover logo após a sua aplicação.'
    ],
    v: 60,
    produtividade: [
      {
        producao: 4,
        unidade: 'UA',
        n: 0,
        nCobertura: 100,
        p: [
          {
            muitobaixo: 140,
            baixo: 120,
            medio: 80,
            alto: 40
          }
        ],
        k: [
          {
            muitobaixo: 120,
            baixo: 80,
            medio: 60,
            alto: 40
          }
        ]
      },
      {
        producao: 8,
        unidade: 'UA',
        n: 0,
        nCobertura: 120,
        p: [
          {
            muitobaixo: 140,
            baixo: 120,
            medio: 80,
            alto: 40
          }
        ],
        k: [
          {
            muitobaixo: 120,
            baixo: 80,
            medio: 60,
            alto: 40
          }
        ]
      }
    ],
  },
  {
    cultura: 'Mombaça - Manutenção',
    fonte: [
      'https://www.infoteca.cnptia.embrapa.br/bitstream/doc/984110/1/RT27pastagem.pdf',
      'https://ainfo.cnptia.embrapa.br/digital/bitstream/item/53861/1/rt87-pastagem-panicummaximum.pdf'
    ],
    recomendacoes: [
      'A adubação nitrogenada deve ser aplicada anualmente, parcelada em três a quatro aplicações, durante o período chuvoso em intervalos de 30 a 45 dias.',
      'A uréia pode ser aplicada em cobertura, durante o período chuvoso, tendo-se a precaução de aplicá-la em solo seco.',
      'Sulfato e amônio por conter enxofre ou nitrato e amônio por serem menos susceptíveis às perdas de nitrogênio por volatilização, são as mais indicadas para a adubação em cobertura.',
      'Aplicar 30 kg/ha de enxofre e 30 a 40 kg/ha de uma fórmula de FTE que contenha cobre, zinco, boro e molibdênio.',
      'As perdas de nitrogênio da uréia por volatilização são imprevisíveis e podem até não ocorrer ou serem mínimas, notadamente se chover logo após a sua aplicação.'
    ],
    v: 60,
    produtividade: [
      {
        producao: 4,
        unidade: 'UA',
        n: 0,
        nCobertura: 100,
        p: [
          {
            muitobaixo: 80,
            baixo: 60,
            medio: 40,
            alto: 20
          }
        ],
        k: [
          {
            muitobaixo: 80,
            baixo: 60,
            medio: 40,
            alto: 20
          }
        ]
      },
      {
        producao: 8,
        unidade: 'UA',
        n: 0,
        nCobertura: 120,
        p: [
          {
            muitobaixo: 140,
            baixo: 120,
            medio: 80,
            alto: 40
          }
        ],
        k: [
          {
            muitobaixo: 120,
            baixo: 80,
            medio: 60,
            alto: 40
          }
        ]
      }
    ],
  },
  {
    cultura: 'Feijão',
    recomendacoes: [
      'A adubação nitrogenada de cobertura deve ser realizada 20 dias após a emergência.',
      'Para doses maiores aplicar em duas vezes, metade aos 20 dias e restante aos 30 dias após a emrgência',
      'Recomenda-se aplicar 200 gramas por hectare de molibdato de sódio entre 20 a 30 dias após a emergência do feijão, pulverizando sobbre as folhas'
    ],
    v: 60,
    produtividade: [
      {
        producao: 1800,
        unidade: 'kg',
        n: 20,
        nCobertura: 40,
        p: [
          {
            baixo: 80,
            medio: 60,
            alto: 40
          }
        ],
        k: [
          {
            baixo: 60,
            medio: 40,
            alto: 20
          }
        ]
      },
      {
        producao: 2500,
        n: 30,
        unidade: 'kg',
        nCobertura: 60,
        p: [
          {
            baixo: 110,
            medio: 90,
            alto: 70
          }
        ],
        k: [
          {
            baixo: 50,
            medio: 40,
            alto: 20
          }
        ]
      }
    ],

  },
  {
    cultura: 'Milho Grão',
    recomendacoes: [
      'Para doese maiores que 100 Kg de N por hectare e em solos arenosos, deve-se dividir a dose em duas aplicações quando as plantas apresentarem de 04 a 08 folhas'
    ],
    v: 60,
    produtividade: [
      {
        producao: 6000,
        unidade: 'kg',
        n: 10,
        nCobertura: 60,
        p: [
          {
            baixo: 80,
            medio: 60,
            alto: 30
          }
        ],
        k: [
          {
            baixo: 50,
            medio: 40,
            alto: 20
          }
        ]
      },
      {
        producao: 8000,
        n: 10,
        unidade: 'kg',
        nCobertura: 100,
        p: [
          {
            baixo: 100,
            medio: 80,
            alto: 50
          }
        ],
        k: [
          {
            baixo: 70,
            medio: 60,
            alto: 40
          }
        ]
      },
      {
        producao: 100000,
        n: 10,
        unidade: 'kg',
        nCobertura: 140,
        p: [
          {
            baixo: 120,
            medio: 100,
            alto: 70
          }
        ],
        k: [
          {
            baixo: 90,
            medio: 80,
            alto: 60
          }
        ]
      }
    ],

  },
  {
    cultura: 'Milho Silagem',
    recomendacoes: [
      'Para doese maiores que 100 Kg de N por hectare e em solos arenosos, deve-se dividir a dose em duas aplicações quando as plantas apresentarem de 04 a 08 folhas'
    ],
    v: 60,
    produtividade: [
      {
        producao: 30000,
        n: 10,
        unidade: 'kg',
        nCobertura: 80,
        p: [
          {
            baixo: 80,
            medio: 60,
            alto: 30
          }
        ],
        k: [
          {
            baixo: 100,
            medio: 80,
            alto: 40
          }
        ]
      },
      {
        producao: 40000,
        n: 10,
        unidade: 'kg',
        nCobertura: 130,
        p: [
          {
            baixo: 100,
            medio: 80,
            alto: 50
          }
        ],
        k: [
          {
            baixo: 140,
            medio: 120,
            alto: 80
          }
        ]
      },
      {
        producao: 100000,
        n: 10,
        unidade: 'kg',
        nCobertura: 180,
        p: [
          {
            baixo: 120,
            medio: 100,
            alto: 70
          }
        ],
        k: [
          {
            baixo: 180,
            medio: 160,
            alto: 120
          }
        ]
      }
    ],
  }
]
