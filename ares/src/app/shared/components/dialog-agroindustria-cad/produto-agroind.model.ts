import { MateriaPrima } from "./materia-prima.model"

export interface Produto {
    representacaobd: string,//representação no banco de dados
    descricao: string
    unid: string,
    materiaprima: MateriaPrima
}

export const PRODUTOAGRO:  Produto[] = [
    {
        representacaobd: 'QUEIJO',
        descricao: 'Queijo',
        unid: 'kg',
        materiaprima: {
            representacaobd: 'LEITE',
            descricao: 'Leite',
            unid: 'lt'
        },
    },
    {
        representacaobd: 'REQUEIJAO',
        descricao: 'Requeijão',
        unid: 'kg',
        materiaprima: {
            representacaobd: 'LEITE',
            descricao: 'Leite',
            unid: 'lt'
        },
    },
    {
        representacaobd: 'EMBUTIDOS',
        descricao: 'Carnes processadas',
        unid: 'kg',
        materiaprima: {
            representacaobd: 'CARNE',
            descricao: 'Carne',
            unid: 'Kg'
        },
    },
    {
        representacaobd: 'RAPADURA',
        descricao: 'Rapadura',
        unid: 'kg',
        materiaprima: {
            representacaobd: 'CANA_ACUCAR',
            descricao: 'Cana-de-açúcar',
            unid: 'ton'
        },
    },
    {
        representacaobd: 'CACHACA',
        descricao: 'Cachaça',
        unid: 'lt',
        materiaprima: {
            representacaobd: 'CANA_ACUCAR',
            descricao: 'Cana-de-açúcar',
            unid: 'ton'
        },
    },
    {
        representacaobd: 'IOGURTE',
        descricao: 'Iogurte',
        unid: 'lt',
        materiaprima: {
            representacaobd: 'LEITE',
            descricao: 'Leite',
            unid: 'lt'
        },
    },
    {
        representacaobd: 'DOCES',
        descricao: 'Doces',
        unid: 'Kg',
        materiaprima: {
            representacaobd: 'LEITE',
            descricao: 'Leite',
            unid: 'lt'
        },
    },
    {
        representacaobd: 'BOLO',
        descricao: 'Bolo, Broa, etc',
        unid: 'Kg',
        materiaprima: {
            representacaobd: 'MILHO',
            descricao: 'Milho',
            unid: 'kg'
        },
    },

]