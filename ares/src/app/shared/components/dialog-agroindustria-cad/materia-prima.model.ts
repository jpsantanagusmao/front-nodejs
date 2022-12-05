export interface MateriaPrima {
    representacaobd: string,//representação no banco de dados
    descricao: string
    unid: string
}

export const MATERIA_PRIMA:  MateriaPrima[] = [
    {
        representacaobd: 'CANA_ACUCAR',
        descricao: 'Cana-de-açúcar',
        unid: 'ton'
    },
    {
        representacaobd: 'LEITE',
        descricao: 'Leite',
        unid: 'lt'
    },
    {
        representacaobd: 'CARNE',
        descricao: 'Carne',
        unid: 'Kg'
    },
    {
        representacaobd: 'MILHO',
        descricao: 'Milho',
        unid: 'kg'
    },
]