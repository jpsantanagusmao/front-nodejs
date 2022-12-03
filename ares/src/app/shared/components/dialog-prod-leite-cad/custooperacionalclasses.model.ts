export interface CustoOperacional {
    representacaobd: string,//representação no banco de dados
    descricao: string,
}

export const CUSTOOPERACIONAL: CustoOperacional[] = [
    {
        representacaobd: '<500',
        descricao: 'menos de 500 R$/mês',
    },
    {
        representacaobd: '500_1000',
        descricao: 'de 500 a 1.000 R$/mês',
    },
    {
        representacaobd: '1000_3000',
        descricao: 'de 1 a 3 mil R$/mês',
    },
    {
        representacaobd: '3000_5000',
        descricao: 'de 3 a 5 mil R$/mês',
    },
    {
        representacaobd: '5000_10000',
        descricao: 'de 5 a 10 mil R$/mês',
    },
    {
        representacaobd: '>10000',
        descricao: 'mais de 10 mil R$/mês',
    },

]