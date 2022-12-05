export interface OrigemMp {
    value: string,
    descricao: string
}
export const ORIGEMMP: OrigemMp[] = [
    {
        value: 'PROPRIA',
        descricao: 'Própria'
    },
    {
        value: 'TERCEIROS',
        descricao: 'Terceiros'
    },
    {
        value: 'PROPRIA_TERCEIROS',
        descricao: 'Própria + Terceiros'
    },
]