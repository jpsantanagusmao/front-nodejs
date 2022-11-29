export interface Itemfinanciavel {
    representacaobd: string,//representação no banco de dados
    descricao: string,
    unidade: string,
}

export const ITENS_FINANCIAVEIS:  Itemfinanciavel[] = [
    {
        representacaobd: 'AQ_MATRIZES_LEITE',
        descricao: 'Aquisição de matrizes leiteiras',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_MATRIZES_CORTE',
        descricao: 'Aquisição de matrizes zebuinas para corte',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_TRATOR',
        descricao: 'Aquisição de trator',
        unidade: 'un'
    },
    {
        representacaobd: 'AQ_CARRETA_AGRICOLA',
        descricao: 'Aquisição de carreta agrícola',
        unidade: 'un'
    },
    {
        representacaobd: 'AQ_COLHEITADEIRA',
        descricao: 'Aquisição de colheitadeira',
        unidade: 'un'
    },
    {
        representacaobd: 'AQ_PAINEL_FOTOVOLTAICO',
        descricao: 'Aquisição de paineis fotovoltáicos',
        unidade: 'w' //potência do modelo
    },
    {
        representacaobd: 'REFORMA_CURRAL',
        descricao: 'Reforma de curral',
        unidade: 'metro linear'
    },
    {
        representacaobd: 'REFORMA_PASTAGEM',
        descricao: 'Reforma de pastagem',
        unidade: 'hectare'
    },
    {
        representacaobd: 'FORMACAO_PASTAGEM',
        descricao: 'Formação de pastagem',
        unidade: 'hectare'
    },
    {
        representacaobd: 'CONSTRUCAO_CURRAL',
        descricao: 'Construção de curral',
        unidade: 'metro linear'
    },
]