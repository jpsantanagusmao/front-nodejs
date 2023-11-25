// Guia Prático para
// Interpretação de
// Resultados de
// Análises de Solo

import { CLASS_CATEGORY } from "./tbl-p";


// https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1042994/1/Doc206.pdf
// Tabela 4, pág: 12
export const ELEMENTS = {
  ph: [

    {
      e: 5,
      classificacao: CLASS_CATEGORY.ACIDO,// 'ácido',
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 6,
      classificacao:  CLASS_CATEGORY.NEUTRO,//'neutro',
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 100,
      classificacao:  CLASS_CATEGORY.ALCALINO, //'alcalino',
      implicacoes: [],
      recomendacao: ''
    }
  ],
  k: [
    {
      e: 30,
      classificacao:  CLASS_CATEGORY.BAIXO,//CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 60,
      classificacao:  CLASS_CATEGORY.MEDIO, //'medio',
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao:  CLASS_CATEGORY.ALTO, //CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  mo: [
    {
      e: 1.5,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 30,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 100,
      classificacao: CLASS_CATEGORY.ALTO,
      implicacoes: [],
      recomendacao: ''
    }
  ],
  al: [
    {
      e: 0.5,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 100,
      classificacao: CLASS_CATEGORY.ALTO,
      implicacoes: [],
      recomendacao: ''
    }
  ],
  ca: [
    {
      e: 1.6,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 3,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  mg: [
    {
      e: 0.4,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  t: [
    {
      e: 2,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 4,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  T: [
    {
      e: 5,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 15,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  V: [
    {
      e: 50,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 70,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  val: [
    {
      e: 30,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 50,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ],
  pst: [
    {
      e: 6,
      classificacao: CLASS_CATEGORY.BAIXO, // 'baixo'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 15,
      classificacao: CLASS_CATEGORY.MEDIO, // 'médioalto'
      implicacoes: [],
      recomendacao: ''
    },
    {
      e: 1000,
      classificacao: CLASS_CATEGORY.ALTO, // 'alto'
      implicacoes: [],
      recomendacao: ''
    }
  ]
}
