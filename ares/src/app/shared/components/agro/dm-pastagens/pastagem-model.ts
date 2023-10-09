export interface PastagemModel {
    cultura: string,
    descanso: number,
    ms: number,
    recs: string //recomendações específicas da cultura link: https://ainfo.cnptia.embrapa.br/digital/bitstream/item/123642/1/Folder-Zuri-Final-2014.pdf
}

export const CULTURAS: PastagemModel[] = [
    {cultura: 'Mombaça', descanso: 28, ms: 40, recs: ''},
    {cultura: 'Colonião', descanso: 28, ms: 40, recs: ''},
    {cultura: 'Elefante', descanso: 35, ms: 40, recs: ''},
    {cultura: 'Tanzânia', descanso: 28, ms: 30, recs: ''},
    {cultura: 'Brachiaria Bryzantha', descanso: 28, ms: 20, recs: ''},
    {cultura: 'Brachiaria decumbens', descanso: 28, ms: 18, recs: ''},
    {cultura: 'Tifton', descanso: 21, ms: 18, recs: ''},
    {cultura: 'Grama estrela', descanso: 21, ms: 18, recs: ''},
    {cultura: 'BRS Zuri', descanso: 28, ms: 40, recs: ' Recomenda-se que o pasto seja manejado com altura de entrada de 70-75 cm e altura de saída de 30-35 cm. Suas principais características são a elevada produção, o alto valor nutritivo, a resistência às cigarrinha-das-pastagens e o alto grau de resistência à mancha das folhas.'},
];