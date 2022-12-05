export interface CondCertificacao {
    representacaobd: string,//representação no banco de dados
    descricao: string
}

export const CONDCERTIFICACAO:  CondCertificacao[] = [
    {
        representacaobd: 'NAO_CERTIFICADO',
        descricao: 'Não tem certificação',
    },
    {
        representacaobd: 'EM_PROCESSAMENTO',//A certificação está em andamento
        descricao: 'Em andamento',
    },
    {
        representacaobd: 'MUNICIPAL',
        descricao: 'SIM - Certificação Municipal',
    },
    {
        representacaobd: 'ESTADUAL',
        descricao: 'IMA - Certificação Estadual',
    },
    {
        representacaobd: 'FEDERAL',
        descricao: 'SIF - Certificação Federal',
    },
]