export interface Forrageira {
    representacaobd: string,//representação no banco de dados
    descricao: string,
}

export const FORRAGEIRAS: Forrageira[] = [
    {
        representacaobd: 'nenhum',
        descricao: 'Não tem capineira',
    },
    {
        representacaobd: 'capiacu',
        descricao: 'Capiaçu',
    },
    {
        representacaobd: 'cana',
        descricao: 'Cana-de-açúcar',
    },
    {
        representacaobd: 'capim_elefante',
        descricao: 'Capim elefante',
    },
    {
        representacaobd: 'milho',
        descricao: 'Milho',
    },
    {
        representacaobd: 'sorgo',
        descricao: 'Sorgo',
    },
    {
        representacaobd: 'cana_capim',
        descricao: 'Cana + capim',
    },
    {
        representacaobd: 'cana_milho',
        descricao: 'Cana + milho',
    },
    {
        representacaobd: 'milho_capim',
        descricao: 'Milho + capim',
    },
    {
        representacaobd: 'milho_sorgo',
        descricao: 'Milho + sorgo',
    },
    {
        representacaobd: 'milho_capiacu',
        descricao: 'Milho + Capiaçu',
    },
    {
        representacaobd: 'milho_cana_capim',
        descricao: 'Milho + Cana + capim',
    },
    {
        representacaobd: 'sorgo_cana_capim',
        descricao: 'Sorgo + Cana + capim',
    }
]