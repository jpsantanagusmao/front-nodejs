export const CLASS_CATEGORY = {
  MUITO_BAIXO: 'muito baixo',
  BAIXO: 'baixo',
  MEDIO: 'medio',
  BOM: 'bom',
  ALTO: 'alto',
  ACIDO: 'ácido',
  NEUTRO: 'neutro',
  ALCALINO: 'alcalino',
}

export const TIPO_SOLO: any[] = [
    {
        teorArgila: 80,
        classificacao: 'Argiloso',
        implicacoes: [
            '',
        ],
        recomendacao: '',
        class_P: [
            {
                P: 1.9,
                classificacao: CLASS_CATEGORY.MUITO_BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 3.9,
                classificacao: CLASS_CATEGORY.BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 5.9,
                classificacao: CLASS_CATEGORY.MEDIO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 1000,
                classificacao: CLASS_CATEGORY.BOM,
                implicacoes: [],
                recomendacao: ''
            },
        ]
    },
    {
        teorArgila: 60,
        classificacao: 'Argilo/Siltoso',
        implicacoes: [
            '',
        ],
        recomendacao: '',
        class_P: [
            {
                P: 4.9,
                classificacao: CLASS_CATEGORY.MUITO_BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 7.9,
                classificacao: CLASS_CATEGORY.BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 11.9,
                classificacao: CLASS_CATEGORY.MEDIO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 1000,
                classificacao: CLASS_CATEGORY.BOM,
                implicacoes: [],
                recomendacao: ''
            },
        ]
    },
    {
        teorArgila: 40,
        classificacao: 'Siltoso',
        implicacoes: [
            '',
        ],
        recomendacao: '',


        class_P: [
            {
                P: 5.9,
                classificacao: CLASS_CATEGORY.MUITO_BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 11.9,
                classificacao: CLASS_CATEGORY.BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 17.9,
                classificacao: CLASS_CATEGORY.MEDIO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 1000,
                classificacao: CLASS_CATEGORY.BOM,
                implicacoes: [],
                recomendacao: ''
            },
        ]
    },
    {
        teorArgila: 20,
        classificacao: 'Arenoso',
        implicacoes: [
            '',
        ],
        recomendacao: '',
        class_P: [
            {
                P: 7.9,
                classificacao: CLASS_CATEGORY.MUITO_BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 149,
                classificacao: CLASS_CATEGORY.BAIXO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 19.9,
                classificacao: CLASS_CATEGORY.MEDIO,
                implicacoes: [],
                recomendacao: ''
            },
            {
                P: 1000,
                classificacao: CLASS_CATEGORY.BOM,
                implicacoes: [],
                recomendacao: ''
            },
        ]
    },

]
