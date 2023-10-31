export interface ProducaoEstercoModel {
    descricao: string,
    tempo: number, // Tempo para fermentação (dias)
    producao: number, // Produção de esterco (Kg/animal/dia)
    dds: number, // Densidade Dejetos Sólidos Bovinos (Kg/m3)
    ddl: number, // Densidade do Dejeto Líquido (Kg/m3)
    tempoArmazenamento: number, // Tempo de armazenamento (dias)
    razao: number // Auxilia no cálculo das dimensoes da Esterqueira Líquida
}
 
export const PRODUCAO_ESTERCO: ProducaoEstercoModel[] = [
    {descricao: 'Confinado - confinamento integral', tempo: 60, producao: 24, dds: 600, ddl: 1007, tempoArmazenamento:20, razao: 0.5},
    {descricao: 'Semiconfinado - duas ordenhas diárias', tempo: 20, producao: 17, dds: 600, ddl: 1007, tempoArmazenamento:20, razao: 1},
    {descricao: 'Extensivo - uma ordenha diária', tempo: 20, producao: 8, dds: 600, ddl: 1007, tempoArmazenamento: 20, razao: 1},
];