export class ModelosCalagem {

  //Limite máximo para aplicação de uma única vez do calcário
  static limmaxcalc: number = 3;

  constructor() { }
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
    const ca = parseFloat(obj.ca);
    const mg = parseFloat(obj.mg);
    const k = parseFloat((obj.k / 391).toFixed(2));
    const h = parseFloat(obj.h);
    const al = parseFloat(obj.al);
    const v2 = parseFloat(obj.v2).toFixed(2);
    const prnt = parseFloat(obj.prnt) | 100;

    const SB = Number(await Number(ca + mg + k).toFixed(2));
    const t = Number(await Number(ca + mg + k + al).toFixed(2));
    const T = Number(await Number(ca + mg + k + al + h).toFixed(2));
    //const T = await Number(ca + mg + (k/391) + h + al).toFixed(2);
    const v1 = Number(((SB) / Number(T)) * 100).toFixed(2);

    //Calculando a necessidade de calcário em ton/ha
    let NC = ((Number(v2)/100 - Number(v1)/100) * Number(T) / (Number(prnt) / 100)).toFixed(2);


    obj.memoria += await `
    <div>
      <p>
        O cálculo de calagem é baseado no método da elevação da porcentagem de saturação de bases e consiste na seguinte fórmula:
      </p>
    </div>
    <div>
      <strong>Soma de Bases (SB) = </strong>Ca + Mg + (K/391) => ${ca} + ${mg} + ${k} => ${SB} cmolc/dm<sup>3</sup>
    </div>
    <div>
      <strong>CTC efetiva (t) = </strong>Ca + Mg + (K/391) + Al => ${ca} + ${mg} + ${k} + ${al} => ${t} cmolc/dm<sup>3</sup>
    </div>
    <div>
      <strong>CTC a PH 7 (T) = </strong>Ca + Mg + (K/391) + Al + H => ${ca} + ${mg} + ${k} + ${h} + ${al} => ${T} cmolc/dm<sup>3</sup>
    </div>
    <div>
      <strong>Saturação da bases esperada para a cultura (V<sub>2</sub>) = </strong> ${v2} %
    </div>
    <div>
      <strong>Saturação da bases (V) = </strong> (${SB} / ${T}) * 100 => ${v1} %
    </div>

    `;

    let nc = Number(NC);

    if (Number(NC) < 0) {
      nc = Number(NC) < 0 ? Number(0) : Number(NC);
      obj.memoria += `

      <div>
        <strong>
          NC = ( "V esperado da Cultura ${obj.culturaSelected.cultura}" - "V efetivo") x T / PRNT (%)
        </strong>
          => (${Number(v2)/100} - ${Number(v1)/100}) * ${T} / (${prnt}/100) = ${NC}  t.ha-¹ de calcário
      </div>

      <div>
        <strong>
          <p>Como a necessidade de aplicação de calcário é negativa, fica então dispensada da aplicação.</p>
        </strong>
      </div>

      `;

    } else {
      if (Number(NC) > this.limmaxcalc) {
        obj.memoria += `
        <div>
          <strong>
            <p>* Para quantidade superior a ${this.limmaxcalc} é necessário dividir a aplicação anualmente até atingir a quantidade recomendada. Além disso é importante fazer o acompanhamento com amostras durante a correção.</p>
          </strong>
        </div>
        `;

      }

      obj.memoria += `
      <div>
        <strong>
          NC = ( "V esperado da Cultura ${obj.culturaSelected.cultura}" - "V efetivo") x T / PRNT(%)
        </strong>
          => (${v2} - ${v1}) * ${T} / (${prnt}/100) = ${NC}  t.ha-¹ de calcário
      </div>
      `;

    }

    //Calculo considerando o PRNT
    //Definindo o tipo de Calcário recomendado
    let tipo: any;

    if (Number(NC) > 0) {

      tipo = await ModelosCalagem._defineTipoCalcario(ca, mg, obj.memoria);
      obj.memoria = tipo.memoria;

    }

    return {
      metodo: 'Método da elevação da porcentagem de saturação por bases',
      nc: nc,
      tipodeCalcario: tipo?.tipo || undefined,
      memoria: obj.memoria,
      t,
      T,
      v: v1,
      ca_mg: Number(Number(ca / mg)).toFixed(2),
      mg_k: Number(Number(mg / k)).toFixed(2),
      ca_k: Number(Number(ca / k)).toFixed(2),
      t_ca: Number(Number(ca / T) * 100).toFixed(2),
      t_mg: Number(Number(mg / T) * 100).toFixed(2),
      t_k: Number(Number(k / T) * 100).toFixed(2),
    }

  }

  private static async _defineTipoCalcario(ca: number, mg: number, memoria: string) {
    if (
      (ca <= 0.41)
      && (mg <= 0.16)
    ) {
      memoria += `<div>Com teores de Cálcio < 0,41 e Magnésio < 0,16 => Recomenda-se o Calcário Dolomítico.</div>`

      return { tipo: 'Dolomítico', memoria };
    } else {
      memoria += `<div>Com teores de Cálcio > 0,41 e Magnésio > 0,16 => Recomenda-se o Calcário Calcítico.</div>`

      return { tipo: 'Calcitico', memoria };
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
