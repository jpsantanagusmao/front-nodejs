export class ModelosCalagem {

    constructor(){}
    /**
     * 
     * Informa um objeto com os dados de Cálcio, Magnésio, potássio, hidrogenio, saturação de bases desejada e PRNT do calcário.
     * @param {ca:number, mg:number, k:number, h:number, al:number, v2:number, PRNT:number} 
     * @returns 
     */
    public static async saturacaoBases(obj: any) {
        /**
         * O cálculo de calagem baseado no método da elevação da porcentagem de saturação de bases consiste na seguinte fórmula:
         * 
         * t.ha-¹ de calcário = (V2 – V1).T/PRNT
         * 
         *V2 = 70% (saturação por bases desejada)
         *V1 = saturação por bases atual (análise do solo) = [(Ca²+ + Mg²+ + K+).100] /T
         *T = capacidade de troca catiônica [Ca²+ + Mg²+ + K+ + (H + Al)], em cmolc.dm-³
         *PRNT = poder relativo de neutralização total do calcário a ser aplicado
         */
        const v2 = await Number(obj.v2).toFixed(2);
        const T = await Number(obj.ca + obj.mg + obj.k + obj.h + obj.al).toFixed(2);
        const v1 = await Number(Number((obj.ca + obj.mg + obj.k) * 100) / Number(T)).toFixed(2);
        const PRNT = Number(obj.PRNT).toFixed(2);

        //Calculando a necessidade de calcário em ton/ha
        const NC = ((Number(v2) - Number(v1)) * Number(T) / Number(PRNT)).toFixed(0);

        //Definindo o tipo de Calcário recomendado
        let tipo: string = this._defineTipoCalcario(obj.ca, obj.mg);



        return {
            metodo: 'Método da elevação da porcentagem de saturação por bases',
            nc: NC,
            tipodeCalcario: tipo
        }



    }
    private _defineTipoCalcario(ca: number, mg: number): string {
        if (
            (ca > 0.41)
            && (mg > 0.16)
        ) {
            return 'Dolomítico';
        } else {
            return 'Calcitico';
        }
    }
    public neutralizaçãoAl(obj: any) {
        /**
         * Da mesma forma podemos realizar o cálculo de calagem baseado no método da neutralização do Al³+ e fornecimento de Ca²+ + Mg²+ .
         * 
         * t.ha-¹ de calcário = Y.[Al³+ – (mt.t/100)] + [X-(Ca²+ + Mg²+)].100/PRNT
         * 
         * X= exigência em cálcio e magnésio pela cultura
         * 
         * mt = máxima saturação por alumínio admitida pela cultura
         * 
         * Y = fator que varia com a capacidade tampão de acidez do solo. Pode ser determinado conforme a textura.
         * 
         * Para solos arenosos (0 a 15% de argila),textura média (16 a 35% de argila),argilosos (36 a 60% de argila),muito argilosos (61 a 100% de argila).
         * 
         * Nesse sentido, são utilizados os valores de Y (0 a 1,0; 1,0 a 2,0; 2,0 a 3,0 e de 3,0 a 4,0 respectivamente).
         */


    }
}