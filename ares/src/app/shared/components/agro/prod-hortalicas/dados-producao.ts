export interface Dimensao {
    comprimentoMin: number,
    larguraMin: number;
    comprimentoMax: number,
    larguraMax: number;
}
export interface FormaPlantio {
    forma: string,
    espacamentoRecomendado: Dimensao,
}

export interface UnidaComercializacao {
    descricao: string,
    sigla: string,
    convKg: number,
    coments: string
}

export interface ProdutoModel {
    cultura: string,
    tempoProducao: number,
    espacamentoRecomendado: Dimensao,
    plantio: FormaPlantio,
    rebrota: number,
    unidadeComercializaca: UnidaComercializacao,
    comments: string
}

export const HORTALICAS = [
    {
        cultura: "Acelga",
        tempoProducao: 70,
        espacamentoRecomendado: {
            comprimentoMin: 0.2,
            larguraMin: 0.2,
            comprimentoMax: 0.2,
            larguraMax: 0.2
        },
        plantio: {
            forma: "Canteiro",
            espacamentoRecomendado: {
                comprimentoMin: 5,
                larguraMin: 1,
                comprimentoMax: 10,
                larguraMax: 1
            },
        },
        rebrota: undefined,
        unidadeComercializaca: {
            descricao: "Pés/Cabeças",
            sigla: "pés",
            convKg: 0.308,
            coments: "Cabeça ou Pé – equivale a uma planta. É mais utilizada para algumas folhosas como alface, chicória, entre outras. Geralmente a unidade de venda utilizada no mercado atacadista é de dúzias de cabeças ou pés."
        },
        coments: "Cabeça ou Pé – equivale a uma planta. É mais utilizada para algumas folhosas como alface, chicória, entre outras. Geralmente a unidade de venda utilizada no mercado atacadista é de dúzias de cabeças ou pés."
    },
    {
        cultura: "Alface Americana",
        tempoProducao: 60,
        espacamentoRecomendado: {
            comprimentoMin: 0.3,
            larguraMin: 0.3,
            comprimentoMax: 0.3,
            larguraMax: 0.3
        },
        plantio: {
            forma: "Canteiro",
            espacamentoRecomendado: {
                comprimentoMin: 5,
                larguraMin: 1,
                comprimentoMax: 10,
                larguraMax: 1
            },
        },
        rebrota: undefined,
        unidadeComercializaca: {
            descricao: "Pés/Cabeças",
            sigla: "pés",
            convKg: 0.250,
            coments: "Cabeça ou Pé – equivale a uma planta. É mais utilizada para algumas folhosas como alface, chicória, entre outras. Geralmente a unidade de venda utilizada no mercado atacadista é de dúzias de cabeças ou pés."
        },
        coments: "Cabeça ou Pé – equivale a uma planta. É mais utilizada para algumas folhosas como alface, chicória, entre outras. Geralmente a unidade de venda utilizada no mercado atacadista é de dúzias de cabeças ou pés."
    },
    {
        cultura: "Alface Crespa",
        tempoProducao: 45,
        espacamentoRecomendado: {
            comprimentoMin: 0.3,
            larguraMin: 0.3,
            comprimentoMax: 0.3,
            larguraMax: 0.3
        },
        plantio: {
            forma: "Canteiro",
            espacamentoRecomendado: {
                comprimentoMin: 5,
                larguraMin: 1,
                comprimentoMax: 10,
                larguraMax: 1
            },
        },
        rebrota: undefined,
        unidadeComercializaca: {
            descricao: "Pés/Cabeças",
            sigla: "pés",
            convKg: 0.258,
            coments: "Cabeça ou Pé – equivale a uma planta. É mais utilizada para algumas folhosas como alface, chicória, entre outras. Geralmente a unidade de venda utilizada no mercado atacadista é de dúzias de cabeças ou pés."
        },
        coments: "Cabeça ou Pé – equivale a uma planta. É mais utilizada para algumas folhosas como alface, chicória, entre outras. Geralmente a unidade de venda utilizada no mercado atacadista é de dúzias de cabeças ou pés."
    },
]