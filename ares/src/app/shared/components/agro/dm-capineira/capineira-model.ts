export interface CapineiraModel {
    cultura: string,
    int_corte: number, // intervalo de corte
    prd_anual:number, //produção anual em ton/ha de forragem verde
    f_ua: number, //função de ajuste conforme tabels no artigo utilizado
}
export const CULTURAS: CapineiraModel[] = [
    {cultura: 'capim elefante', int_corte: 42, prd_anual: 120, f_ua: 0.34},
    {cultura: 'napier', int_corte: 42, prd_anual: 120, f_ua: 0.34},
    {cultura: 'cameron', int_corte: 42, prd_anual: 120, f_ua: 0.34},
    {cultura: 'capim-tobiatã', int_corte: 42, prd_anual: 80, f_ua: 0.52},
];