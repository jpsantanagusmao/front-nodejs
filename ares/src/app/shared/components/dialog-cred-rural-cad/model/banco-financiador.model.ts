export interface Banco {
    representacaobd: string,//representação no banco de dados
    descricao: string
}

export const BANCO_FINANCIADOR:  Banco[] = [
    {
        representacaobd: 'BB_TARUMIRIM',
        descricao: 'Banco do Brasil Ag. Tarumirim',
    },
    {
        representacaobd: 'BB_VALADARES',
        descricao: 'Banco do Brasil Ag. Gov. Valadares',
    },
    {
        representacaobd: 'BB_BH',
        descricao: 'Banco do Brasil Ag. Belo Horizonte',
    },
    {
        representacaobd: 'BB_IPATINGA',
        descricao: 'Banco do Brasil Ag. Ipatinga',
    },
    {
        representacaobd: 'SICOOB_CREDICOPE_TARUMIRIM',
        descricao: 'SICOOB Tarumirim',
    },
    {
        representacaobd: 'SICOOB_CREDICOPE_ALVARENGA',
        descricao: 'SICOOB Alvarenga',
    },
    {
        representacaobd: 'SICOOB_CREDICOPE_ITANHOMI',
        descricao: 'SICOOB Itanhomi',
    },
    {
        representacaobd: 'CEF',
        descricao: 'Caixa Econômica Federal',
    },
    {
        representacaobd: 'BNORD',
        descricao: 'Banco do Nordeste',
    }

]