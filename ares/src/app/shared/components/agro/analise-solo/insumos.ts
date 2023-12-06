export const FERTILIZANTES = [
  {
    descricao: 'NPK 04-14-08',
    n: 20,
    p: 14,
    k: 8,
  },
  {
    descricao: 'NPK 04-30-16',
    n: 4,
    p: 30,
    k: 16,
  },
  {
    descricao: 'Uréia pecuária',
    n: 440
  },
  {
    descricao: 'Uréia agrícola',
    n: 44,
  },
  {
    descricao: 'Sulfato de amônio',
    n: 20,
    s: 40
  },
  {
    descricao: 'Superfosfato Simples',
    p: 18,
  },
  {
    descricao: 'Cloreto de potássio',
    k: 58,
  },
]
export const CLASSE_CALCARIO = {
  MAGNESIANO: 'magnesiano',
  DOLOMITICO: 'dolomítico',
  CALCITICO: 'calcítico',
}
/**
 * No caso do calcário calcítico, o insumo apresenta 5% ou menos de óxido de magnésio.
 * De 5% a 12%, o calcário é considerado magnesiano.
 * Agora, quando os níveis de magnésio estão acima de 12%, o calcário é considerado dolomítico.
 */
/*
  Os tipos de calcário variam de acordo com a porcentagem de magnésio e cálcio que eles apresentam:
  Calcário Calcítico: maior teor de cálcio (45 a 55%) e menor de magnésio;
  Calcário Magnesiano: teor intermediário de magnésio (5 a 12%);
  Calcário Dolomítico: maior teor de magnésio (maior que 12%) e baixo teor de cálcio
*/

/**
 * 
 * link: https://www.embrapa.br/agencia-de-informacao-tecnologica/cultivos/arroz/producao/sistema-de-cultivo/arroz-irrigado-na-regiao-tropical/correcao-do-solo-e-adubacao/correcao-da-acidez-do-solo
 * 
 * tabela 1 informa os teros de CaO e MgO dos calcários
 * 
 */
 
export const CORRETIVOS = [
  {
    descricao: 'Calcário Dolomítico',
    tipo: CLASSE_CALCARIO.DOLOMITICO,
    ca: 5, //Chute
    mg: 12,
    prnt: [
      80,85,90,95
    ],
    camg: 1, //Relação Ca/Mg ideal para aplicação deste corretivo
    tca: 100,
    tmg: 20,
    CaO: 25, // 25-30 % 
    MgO: 13 // 13-20 % 
  },
  {
    descricao: 'Calcário Calcítico',
    tipo: CLASSE_CALCARIO.CALCITICO,
    ca: 45,
    mg: 5, //Chute
    prnt: [
      70,80,85,90,95
    ],
    camg: 3, //Relação Ca/Mg ideal para aplicação deste corretivo
    tca: 55,
    tmg: 15,
    CaO: 40, //40-45 %
    MgO: 1 // 1-5 %
  },
  {
    descricao: 'Calcário Magnesiano',
    tipo: CLASSE_CALCARIO.MAGNESIANO,
    ca: 25,
    mg: 12,
    prnt: [
      60,70,80,85
    ],
    camg: 1, //Relação Ca/Mg ideal para aplicação deste corretivo
    tca: 55,
    tmg: 15,
    CaO: 31, // 31-39 %
    MgO: 6 // 6-12 %  
  }

]
