export interface maodeobra {
    representacaobd: string,//representação no banco de dados
    descricao: string,
}

export const MAO_DE_OBRA: maodeobra[] = [
    {
        representacaobd: 'FAMILIAR',
        descricao: 'Familiar',
    },
    {
        representacaobd: '01_FUNCIONARIO',
        descricao: '01 Funcionário',
    },
    {
        representacaobd: '02_FUNCIONARIO',
        descricao: '02 Funcionários',
    },
    {
        representacaobd: '03_FUNCIONARIO',
        descricao: '03 Funcionários',
    },
    {
        representacaobd: '+03_FUNCIONARIO',
        descricao: '+ de 03 Funcionários',
    },

]