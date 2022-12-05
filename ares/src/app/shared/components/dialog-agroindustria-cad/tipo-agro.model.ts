export interface TipoAgro {
    value: string,
    descricao: string
}
export const TIPOAGRO: TipoAgro[] = [
    {
        value: 'FAMILIAR INDIVIDUAL',
        descricao: 'Familiar'
    },
    {
        value: 'FAMILIAR_COLETIVA',
        descricao: 'Familiar coletiva'
    },
    {
        value: 'EMPRESARIAL',
        descricao: 'Empresarial'
    },
]