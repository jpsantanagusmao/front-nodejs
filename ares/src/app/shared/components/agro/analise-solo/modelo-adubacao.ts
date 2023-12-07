import { ELEMENTS } from "./elements.model";
import { CLASS_PH_AGUA } from "./tbl-acidez";
import { CLASS_CATEGORY } from "./tbl-p";

export class ModelosAdubacao {

  constructor() { }
  public static async classElement(element, valor) {

    const value = Number(valor);
    let first: boolean = false;//identifica se entrou a classe

    let response;

    ELEMENTS[element].map(e => {

      if ((e.e >= value) && !first) {
        response = e;
        first = true;
      }

    });

    return response;

  }

  // public static async classifica_K(valor, table, producao) {

  //   // console.log(valor);
  //   // console.log(table);
  //   // console.log(producao);
  //   const levels = producao.k;
  //   levels.map(l => {
  //     const obj = Object.entries(producao.k)
  //     // console.log(producao.k);

  //     for (const [key, value] of Object.entries(l)) {
  //       // console.log(`${key}: ${value}`);
  //       // if(Number(value))
  //     }


  //   })

  // }

  public static async classifica_ph(valor) {
    const value = Number(valor);
    let first: boolean = false;//identifica se entrou a classe

    let response;

    CLASS_PH_AGUA.map(e => {

      if ((e.ph >= value) && !first) {
        response = e;
        first = true;
      }

    });

    return response;
  }

  public static async getN(producao) {

    return { plantio: producao.n, cobertura: producao.nCobertura };
  }

  public static async getK(producao, classe) {

    let response;

    if ((producao.k) && (classe)) {
      const level_producao = producao.k[0];

      if (
        (classe.classificacao == CLASS_CATEGORY.MUITO_BAIXO)
        || (classe.classificacao == CLASS_CATEGORY.BAIXO)
      ) {
        response = level_producao.baixo;
      }

      if (
        (classe.classificacao == CLASS_CATEGORY.MEDIO)
      ) {
        response = level_producao.medio;
      }

      if (
        (classe.classificacao == CLASS_CATEGORY.BOM)
        || (classe.classificacao == CLASS_CATEGORY.ALTO)
      ) {
        response = level_producao.alto;
      }
    }

    return response;
  }

  public static async getP(producao, classe) {

    // console.log(producao);
    // console.log(classe);
    
    let response;

    if ((producao.p) && (classe)) {

      if (
        (classe.classificacao == CLASS_CATEGORY.MUITO_BAIXO)
        || (classe.classificacao == CLASS_CATEGORY.BAIXO)
      ) {
        response = producao.p[0].baixo;
      }

      if (
        (classe.classificacao == CLASS_CATEGORY.MEDIO)
      ) {
        response = producao.p[0].medio;
      }

      if (
        (classe.classificacao == CLASS_CATEGORY.BOM)
      ) {
        response = producao.p[0].alto;
      }
    }

    return response;
  }

  public static async classifica_P(valor, tabela) {
    valor = Number(valor);
    let first: boolean = false;//identifica se entrou a classe

    let response;
    tabela.class_P.map(t => {

      if ((t.P >= valor) && !first) {
        response = t;
        first = true;
      }
      return response;

    });

    return response;

  }
}
