export interface Suplementacao {
    representacaobd: string,//representação no banco de dados
    descricao: string,
}

export const SUPLEMENTACAO: Suplementacao[] = [
    {
        representacaobd: 'nenhum',
        descricao: 'Não usa ração',
    },
    {
        representacaobd: 'formlocal',
        descricao: 'Ração Formulação local',//Ração de formulação própria que as casas agro elaboram sem critérios conhecidos.
    },
    {
        representacaobd: 'fuba',
        descricao: 'Fubá',
    },
    {
        representacaobd: 'soja_fuba',
        descricao: 'Soja + fubá',
    },
    {
        representacaobd: 'soja_algodao',
        descricao: 'Soja + farelo de algodão',
    },
    {
        representacaobd: 'concentrado',
        descricao: 'Concentrado',
    },
    {
        representacaobd: 'cama_frango',
        descricao: 'Cama de frango',
    },
    {
        representacaobd: 'cama_frango_outros',
        descricao: 'Cama de frango e outros produtos',
    },
    {
        representacaobd: 'soja',
        descricao: 'Soja',
    },
    {
        representacaobd: 'algodao',
        descricao: 'Farelo de algodão',
    },
    {
        representacaobd: 'concentrado18',
        descricao: 'Concentrado 18% PB',
    },
    {
        representacaobd: 'concentrado20',
        descricao: 'Concentrado 20% PB',
    },
    {
        representacaobd: 'concentrado24',
        descricao: 'Concentrado 24% PB',
    }
]