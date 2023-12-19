export interface RebanhoModel {
    categoria: Categoria,
    quantidade: number
}
export interface Categoria {
    descricao: string,
    representacao: string,
    ua: number
}
export const CATEGORIAS: Categoria[] = [
    {descricao: 'Vacas em Lactação', representacao: 'Vacas em período de lactação', ua: 1.00},
    {descricao: 'Vacas secas', representacao: 'Vacas secas', ua: 1.00},
    {descricao: 'Novilhos(as) - 25-36 m', representacao: 'Animais de 24 a 36 meses', ua: 0.75},
    {descricao: 'Novilhos(as) - 12-24 m', representacao: 'Animais de 12 a 24 meses', ua: 0.50},
    {descricao: 'Bezerros - 0-12 m', representacao: 'Animais de 0 a 12 meses', ua: 0.25},
    {descricao: 'Animais para recria', representacao: 'Animais para recria', ua: 0.50},
    {descricao: 'Animais para engorda', representacao: 'Animais para engorda', ua: 0.75},
    {descricao: 'Fêmeas de reposição', representacao: 'Fêmeas de reposição', ua: 0.75},
    {descricao: 'Touros', representacao: 'Touros', ua: 1.250}
];