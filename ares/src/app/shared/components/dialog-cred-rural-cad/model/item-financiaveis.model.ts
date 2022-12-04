export interface Itemfinanciavel {
    representacaobd: string,//representação no banco de dados
    atividade: string,
    descricao: string,
    unidade: string,
}

export const ITENS_FINANCIAVEIS:  Itemfinanciavel[] = [
    {
        representacaobd: 'AQ_MATRIZES_LEITE',
        atividade: 'BOVINOCULTURA_LEITE',
        descricao: 'Aquisição de matrizes leiteiras',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_MATRIZES_CORTE',
        atividade: 'BOVINOCULTURA_CORTE',
        descricao: 'Aquisição de matrizes zebuinas para corte',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_BEZERROS_CORTE_CUSTEIO',
        atividade: 'BOVINOCULTURA_CORTE',
        descricao: 'Aquisição de Bezerros + Custeio',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_MATRIZES_CORTE_CUSTEIO',
        atividade: 'BOVINOCULTURA_CORTE',
        descricao: 'Aquisição de matrizes zebuinas + Custeio',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_MATRIZES_LEITE_CUSTEIO',
        atividade: 'BOVINOCULTURA_CORTE',
        descricao: 'Aquisição de matrizes leiteiras + Custeio',
        unidade: 'CAB'
    },
    {
        representacaobd: 'AQ_TRATOR',
        atividade: 'BOVINOCULTURA_LEITE',
        descricao: 'Aquisição de trator',
        unidade: 'UN'
    },
    {
        representacaobd: 'AQ_CARRETA_AGRICOLA',
        atividade: 'BOVINOCULTURA',
        descricao: 'Aquisição de carreta agrícola',
        unidade: 'UN'
    },
    {
        representacaobd: 'AQ_COLHEITADEIRA',
        atividade: 'BOVINOCULTURA',
        descricao: 'Aquisição de colheitadeira',
        unidade: 'UN'
    },
    {
        representacaobd: 'AQ_PAINEL_FOTOVOLTAICO',
        atividade: 'BOVINOCULTURA',
        descricao: 'Aquisição de paineis fotovoltáicos',
        unidade: 'KW' //potência do modelo
    },
    {
        representacaobd: 'REFORMA_CURRAL',
        atividade: 'BOVINOCULTURA',
        descricao: 'Reforma de curral',
        unidade: 'metro linear'
    },
    {
        representacaobd: 'REFORMA_PASTAGEM',
        atividade: 'BOVINOCULTURA',
        descricao: 'Reforma de pastagem',
        unidade: 'hectare'
    },
    {
        representacaobd: 'FORMACAO_PASTAGEM',
        atividade: 'BOVINOCULTURA',
        descricao: 'Formação de pastagem',
        unidade: 'hectare'
    },
    {
        representacaobd: 'CONSTRUCAO_CURRAL',
        atividade: 'BOVINOCULTURA',
        descricao: 'Construção de curral',
        unidade: 'metro linear'
    },
    {
        representacaobd: 'CONSTRUCAO_GALPAO',
        atividade: 'CAFE',
        descricao: 'Construção de galpãp beneficiamento café',
        unidade: 'metro quadrado'
    },
    {
        representacaobd: 'AQ_SECADOR_CAFE',
        atividade: 'CAFE',
        descricao: 'Aq. Secador Café',
        unidade: 'UN'
    },
]