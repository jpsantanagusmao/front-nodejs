export interface LinhaCredito {
    representacaobd: string,//representação no banco de dados
    descricao: string,
}

export const LINHA_CREDITO:  LinhaCredito[] = [
    {
        representacaobd: 'PRONAF_INVESTIMENTO',
        descricao: 'Pronaf investimento',
    },
    {
        representacaobd: 'PRONAF_CUSTEIO',
        descricao: 'Pronaf custeio',
    },
    {
        representacaobd: 'MODERAGRO_INVESTIMENTO',
        descricao: 'Moderagro investimento',
    },
    {
        representacaobd: 'MODERAGRO_CUSTEIO',
        descricao: 'Moderagro custeio',
    },
    {
        representacaobd: 'PRONAMP_INVESTIMENTO',
        descricao: 'Pronamp investimento',
    },
    {
        representacaobd: 'PRONAMP_CUSTEIO',
        descricao: 'Pronamp custeio',
    },
    {
        representacaobd: 'INVESTAGRO_INVESTIMENTO',
        descricao: 'InvestAgro investimento',
    },
    {
        representacaobd: 'INVESTAGRO_CUSTEIO',
        descricao: 'InvestAgro custeio',
    },
    {
        representacaobd: 'ABC_INVESTIMENTO',
        descricao: 'ABC investimento',
    },
    {
        representacaobd: 'ABC_CUSTEIO',
        descricao: 'ABC custeio',
    },
    {
        representacaobd: 'RPL_INVESTIMENTO',
        descricao: 'RPL investimento',
    },
    {
        representacaobd: 'RPL_CUSTEIO',
        descricao: 'RPL custeio',
    },
    {
        representacaobd: 'RPL_EQ_INVESTIMENTO',
        descricao: 'RPL Equalizável investimento',
    },
    {
        representacaobd: 'RPL_EQ_CUSTEIO',
        descricao: 'RPL Equalizável custeio',
    },

]