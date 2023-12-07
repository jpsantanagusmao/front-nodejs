import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CLASS_CATEGORY, TIPO_SOLO } from './tbl-p';
import { ModelosCalagem } from './modelo-calagem';
import { CULTURAS } from './tbl-exig-nutricionais';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { ModelosAdubacao } from './modelo-adubacao';
import { CORRETIVOS, FERTILIZANTES } from './insumos';
import { resolver } from '../../../../../../solver2';
import Solver from 'javascript-lp-solver'
import { AterModel } from 'src/app/shared/models/ater.model';

@Component({
  selector: 'analise-solo',
  templateUrl: './analise-solo.component.html',
  styleUrls: ['./analise-solo.component.css']
})
export class AnaliseSoloComponent implements OnInit {

  situacao: any = {};
  orientacoes: any = {};
  recomendacoes: any = {};

  form: FormGroup;
  // formCalcario: FormGroup;
  formCalc: FormGroup;

  tipoDeSolo = TIPO_SOLO;
  soloSelected: any;

  nc: any;
  CULTURAS_DATA = CULTURAS;
  culturaSelected: any;
  faixaProducao: any;
  faixaProducaoSelected: any;

  calcarioSelected: any;
  prntSelected: any;
  prntrsCalcarioSelected: any;

  fertilizantesNSelected: any;
  fertilizanteNSelected: any;

  fertilizantesPSelected: any;
  fertilizantePSelected: any;

  fertilizantesKSelected: any;
  fertilizanteKSelected: any;

  fertilizantes = FERTILIZANTES;
  // corretivos = CORRETIVOS;
  corretivos;

  memoria: any = '';
  calculated: boolean = false;

  qtd_N: any;
  qtd_Nc: any;
  qtd_P2O5: any;
  qtd_K2O: any;

  msgAbubacao;

  FertilizantesCalculated: any;

  calcarioCalculated: Number;
  hasCalcCalcario: boolean = false;
  msgCalcario;
  //Classe dos nutrientes
  class_h;
  class_al;
  class_ca;
  class_mg;
  class_k;
  class_ph;
  class_mo;
  class_tal;
  class_v;
  class_T;
  class_t;
  class_p;

  constructor(
    private _userCache: UserCacheService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loadtables();
    this.loadForm();
    // this.createformWanderson();
    // this.createformManuel();
  }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();

  }

  async solver() {
    const arr = [
      this.fertilizanteNSelected,
      this.fertilizantePSelected,
      this.fertilizanteKSelected
    ]

    if (!(
      this.fertilizanteNSelected
      && this.fertilizantePSelected
      && this.fertilizanteKSelected
    )) {
      return
    }


    const unique = [...new Set(arr.map(obj => obj))];
    let variables: any = {};

    unique.forEach(o => {
      variables[`${o.descricao}`] =
      {
        n: o.n || 0,
        nc: o.n || 0,
        p: o.p || 0,
        k: o.k || 0,
        preco: o.preco || 100
      };
    });

    const optimize = {
      preco: "min"
    }

    const constraints = {
      'n': { "min": (this.qtd_N.plantio + this.qtd_N.cobertura) * 0.9, "max": (this.qtd_N.plantio + this.qtd_N.cobertura) * 1.1 },
      'nc': { "min": this.qtd_N.cobertura * 0.9, "max": this.qtd_N.cobertura * 1.1 },
      'p': { "min": this.qtd_P2O5 * 0.9, "max": this.qtd_P2O5 * 1.1 },
      'k': { "min": this.qtd_K2O * 0.9, "max": this.qtd_K2O * 1.1 },
    }

    let model: any = {
      optimize,
      constraints,
      variables
    }

    // console.log(model);

    const response = await Solver.Solve(model);

    const obj = []

    // console.log(response);

    unique.forEach(r => {
      // console.log(r);
      let ck = 1; //Constante para ajuste da recomendação
      //descobre o menor indice n,p, k
      if ((r.n < r.p) && (r.n < r.k) && (r.n > 0)) {
        //Se o teor de N é menor que P e K então usaremos esta como constante
        ck = r.n
      } else {
        if ((r.p < r.k) && (r.p > 0)) {
          //Se o teor de fósfor é menor que o de potássio usaremos o teor de fósforo
          ck = r.p;
        } else {
          ck = r.k;
        }
      }


      //e multiplica pelo response k dentro do loop

      Object.keys(response).forEach(k => {
        if (k == r.descricao) {

          if (Number(response[`${k}`]) > 0) {
            let hasN = false;
            let hasP = false;
            let hasK = false;

            if (r?.n) {
              hasN = true;
            }
            if (r?.p) {
              hasP = true;
            }
            if (r?.k) {
              hasK = true;
            }

            obj.push({ 'Fertilizante': k, 'quantidade': Number(Number(response[`${k}`] * 100).toFixed(0)), hasN, hasP, hasK })
          }
        }
      })
    });

    this.msgAbubacao = `
    <h2>
    <strong>
      Recomendação de adubação
    </strong>
    </h2>
    <ul>
    `;
    obj.map(r => {
      this.msgAbubacao += `
      <li>${(r.quantidade * this.formCalc.controls.area.value).toFixed(0)} Kg de ${r.Fertilizante}</li>
      `;
    })
    this.msgAbubacao += `</ul>`;
    this.FertilizantesCalculated = obj;


  }
  selectSolo(event) {
    this.calculated = false;

    this.soloSelected = this.form.controls.classificacao.value;
    this.classNutrients();

  }

  selectCultura(event) {
    this.calculated = false;

    this.culturaSelected = this.form.controls.cultura.value;
    this.faixaProducao = this.culturaSelected.produtividade;
    
    this.faixaProducaoSelected = this.faixaProducao[0];

    this.classNutrients();

  }

  async classNutrients() {
    await this.classP();
    await this.getN();
    await this.getP();
    await this.getK();
    // await this.classElements()

    // alert(JSON.stringify(this.class_al))

  }
  elementsClassified() {
    let msgerror = '';
    let parametro = 'H (hidrogenio)';


    if (this.class_h) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
`;
      return false;
    }
    parametro = 'Al (alumínio)';
    if (this.class_al) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'Ca (Cálcio)';
    if (this.class_ca) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'Mg (Magnésio)';
    if (this.class_mg) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'PH';
    if (this.class_ph) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'MO (Matéria orgânica)';
    if (this.class_mo) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = '%Al na CTC (Saturação por alumínio)';
    if (this.class_tal) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'V (Saturação por bases)';
    if (this.class_v) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'T (CTC potencial)';
    if (this.class_T) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 't (CTC efetiva)';
    if (this.class_t) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'K (Potássio)';
    if (this.class_k) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
      `;
      return false;
    }
    parametro = 'P (Fósforo)';
    if (this.class_p) {
      msgerror = `
      É necessário fazer a classificação do parâmetro ${parametro};
`;
      return false;
    }
  }
  async getN() {
    const producao = this.faixaProducaoSelected;

    if (producao)
      this.qtd_N = await ModelosAdubacao.getN(producao);

  }
  async getK() {
    const producao = this.faixaProducaoSelected;
    const classe = this.class_k;

    if (producao && classe)
      this.qtd_K2O = await ModelosAdubacao.getK(producao, classe);

  }

  async getP() {

    const producao = this.faixaProducaoSelected;
    const classe = this.class_p;

    if (producao && classe)
      this.qtd_P2O5 = await ModelosAdubacao.getP(producao, classe);

  }

  async classElements(e) {
    // this.classK()
    // this.classP()

    //Fecha as telas para evitar equívocos. Pode achar que calculou algo quando alterou algum elemento.
    this.calculated = false;
    const element = e.target.id.toLowerCase();
    const valor = Number(e.target.value);

    // TODO: Encontrar referências para classificação do Elemento H

    if (element == 'h')//Não encontrei referência para classificação do H
      //this.class_h = await ModelosAdubacao.classElement(element, valor);

      if (element == 'al')
        this.class_al = await ModelosAdubacao.classElement(element, valor);

    if (element == 'ca')
      this.class_ca = await ModelosAdubacao.classElement(element, valor);

    if (element == 'mg')
      this.class_mg = await ModelosAdubacao.classElement(element, valor);

    if (element == 'ph')
      this.class_ph = await ModelosAdubacao.classifica_ph(valor);

    if (element == 'mo')
      this.class_mo = await ModelosAdubacao.classElement(element, valor);

    if (element == 'tal')
      this.class_tal = await ModelosAdubacao.classElement(element, valor);

    if (element == 'v')
      this.class_v = await ModelosAdubacao.classElement(element, valor);

    if (element == 'T')
      this.class_T = await ModelosAdubacao.classElement(element, valor);

    if (element == 't')
      this.class_t = await ModelosAdubacao.classElement(element, valor);

    if (element == 'k') {
      this.class_k = await ModelosAdubacao.classElement(element, valor);
      await this.getK();

    }

    if (element == 'p') {
      this.classP();
      await this.getP();
    }

  }

  // async classK() {
  //   const e = this.form.controls.k.value;
  //   const table = this.culturaSelected;
  //   const producao = this.faixaProducaoSelected;
  //   console.log(producao);
  //   console.log(e);
  //   console.log(table);

  //   if ((e && table && producao?.k)) {
  //     this.class_k = await ModelosAdubacao.classifica_K(e, table, producao)

  //   }
  //   console.log('this.classK');
  //   console.log(this.class_k);

  // }

  async classP() {
    const e = this.form.controls.p.value;
    const solo = this.soloSelected;

    if (e && solo) {
      const cE = await ModelosAdubacao.classifica_P(e,
        solo)

      this.class_p = cE;
    }
  }

  async selectProducao(event) {
    this.calculated = false;

    this.faixaProducaoSelected = this.form.controls.producao.value;

    await this.classNutrients();

  }

  loadCorretivos() {
    /**
     * Um solo ideal deve apresentar um nível de cálcio (Ca) cerca de 3 vezes maior do que o nível de magnésio (Mg). Vamos usar como exemplo um solo cujo nível de cálcio esteja em 32mmolc/dm³ e de magnésio em 16mmolc/dm³: 32 / 16 = 2. Neste caso, você deve optar pelo calcário calcítico para equilibrar o nível de cálcio no solo.
     * O segundo parâmetro a ser observado é a porcentagem de cálcio na capacidade de troca de cátions (CTC) total. No caso do cálcio, a porcentagem deve estar entre 55 e 60%, enquanto que o magnésio deve estar entre 15 e 20%. Para isso, considere o teor de cálcio/magnésio do solo dividido pela CTC multiplicado por 100. Caso os valores fiquem abaixo e acima dos níveis ideais, respectivamente, você também deve optar pelo calcário calcítico.


    */
    // this.corretivos = this.corretivos.filter(f => {
    //   if (this.nc.ca_mg > f.camg) {
    //     return f;
    //   }
    // });

    // this.nc.corretivos = this.corretivos;

  }

  loadtables() {
    this.fertilizantesNSelected = this.fertilizantes.filter(f => {
      if (f.n
        // && !(f.descricao == this.fertilizanteKSelected.descricao)
        // && !(f.descricao == this.fertilizantePSelected.descricao)
      ) {
        return f;
      }
    });
    this.fertilizantesPSelected = this.fertilizantes.filter(f => {
      if (f.p) {
        return f;
      }
    });
    this.fertilizantesKSelected = this.fertilizantes.filter(f => {
      if (f.k) {
        return f;
      }
    });

  }

  loadFormEspecificacoes() {
    this.formCalc = new FormGroup({
      corretivo: new FormControl('', [Validators.required]),
      prnt: new FormControl('', [Validators.required]),
      fontN: new FormControl('', [Validators.required]),
      fontP: new FormControl('', [Validators.required]),
      fontK: new FormControl('', [Validators.required]),
      area: new FormControl('1', [Validators.required]),
    });
  }
  loadForm() {


    this.form = new FormGroup({
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),
      producao: new FormControl('', [Validators.required]),
      ph: new FormControl('', [Validators.required]),
      p: new FormControl('', [Validators.required]),
      k: new FormControl('', [Validators.required]),
      ca: new FormControl('', [Validators.required]),
      mg: new FormControl('', [Validators.required]),
      al: new FormControl('', [Validators.required]),
      h: new FormControl('', [Validators.required]),
      mo: new FormControl('', [Validators.required])
    });

    this.loadFormEspecificacoes()


    // this.createformVacido();
    // this.createform2();
    // this.createform();

    // this.formCalcario = new FormGroup({
    //   prnt: new FormControl('90', [Validators.required])
    // });
  }
  selectfontN(value) {
    this.fertilizanteNSelected = this.formCalc.controls.fontN.value;
    this.loadtables();

    //contempla P?
    //entao desabilita P

    //contempla K?
    //entao desabilita K


    this.solver();
  }
  selectfontP(value) {
    this.fertilizantePSelected = this.formCalc.controls.fontP.value;
    this.loadtables();

    //contempla N?
    //entao desabilita N

    //contempla K?
    //entao desabilita K


    this.solver();
  }
  selectfontK(value) {
    this.fertilizanteKSelected = this.formCalc.controls.fontK.value;
    this.loadtables();
    //contempla N?
    //entao desabilita N

    //contempla P?
    //entao desabilita P


    this.solver();
  }

  createformVacido() {
    this.form = new FormGroup({
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),
      producao: new FormControl('', [Validators.required]),
      ph: new FormControl('4.93', [Validators.required]),
      p: new FormControl('1.85', [Validators.required]),
      k: new FormControl('49.67', [Validators.required]),
      ca: new FormControl('1.31', [Validators.required]),
      mg: new FormControl('0.28', [Validators.required]),
      al: new FormControl('0.45', [Validators.required]),
      h: new FormControl('4.75', [Validators.required]),
      mo: new FormControl('1.88', [Validators.required])
    });
    this.loadFormEspecificacoes()
  }

  createformManuel() {
    this.form = new FormGroup({
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),
      producao: new FormControl('', [Validators.required]),
      ph: new FormControl('6.4', [Validators.required]),
      p: new FormControl('16.0', [Validators.required]),
      k: new FormControl('134.1', [Validators.required]),
      ca: new FormControl('4.1', [Validators.required]),
      mg: new FormControl('1.2', [Validators.required]),
      al: new FormControl('0.0', [Validators.required]),
      h: new FormControl('1.8', [Validators.required]),
      mo: new FormControl('1.6', [Validators.required])
    });
    this.loadFormEspecificacoes()
  }
  createformWanderson() {
    this.form = new FormGroup({
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),
      producao: new FormControl('', [Validators.required]),
      ph: new FormControl('4.93', [Validators.required]),
      p: new FormControl('1.85', [Validators.required]),
      k: new FormControl('49.67', [Validators.required]),
      ca: new FormControl('1.31', [Validators.required]),
      mg: new FormControl('0.28', [Validators.required]),
      al: new FormControl('0.45', [Validators.required]),
      h: new FormControl('4.75', [Validators.required]),
      mo: new FormControl('1.88', [Validators.required])
    });
    this.loadFormEspecificacoes()
  }

  createform2() {
    this.form = new FormGroup({
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),
      producao: new FormControl('', [Validators.required]),
      ph: new FormControl('6.16', [Validators.required]),
      p: new FormControl('2.41', [Validators.required]),
      k: new FormControl('30.88', [Validators.required]),
      ca: new FormControl('3.06', [Validators.required]),
      mg: new FormControl('1.25', [Validators.required]),
      al: new FormControl('0.0', [Validators.required]),
      h: new FormControl('2.0', [Validators.required]),
      mo: new FormControl('1.40', [Validators.required])
    });
    this.loadFormEspecificacoes()
  }
  createform() {
    this.form = new FormGroup({
      classificacao: new FormControl('', [Validators.required]),
      cultura: new FormControl('', [Validators.required]),

      producao: new FormControl('', [Validators.required]),
      ph: new FormControl('4.68', [Validators.required]),
      p: new FormControl('1.21', [Validators.required]),
      k: new FormControl('13.27', [Validators.required]),
      ca: new FormControl('0.4', [Validators.required]),
      mg: new FormControl('0.11', [Validators.required]),
      al: new FormControl('0.19', [Validators.required]),
      h: new FormControl('2.4', [Validators.required]),
      mo: new FormControl('0.46', [Validators.required])
    });
    this.loadFormEspecificacoes()
  }
  async calcular() {
    this.memoria = '<h2><strong>Memorial de cálculo</strong></h2>';
    const ca = this.form.controls['ca'].value;
    const mg = this.form.controls['mg'].value;
    const k = this.form.controls['k'].value;
    const h = this.form.controls['h'].value;
    const al = this.form.controls['al'].value;
    const v2 = this.form.controls['cultura'].value.v;
    const PRNT = undefined;

    const memoria = this.memoria;

    this.nc = await ModelosCalagem.saturacaoBases({ ca, mg, k, h, al, v2, PRNT, culturaSelected: this.culturaSelected, memoria });
    this.corretivos = this.nc.calcariosRecomendados;

    this.memoria = this.nc.memoria;
    this.calculated = true;

    this.memoria += `
    <div>
      Relação Ca/Mg => ${this.nc.ca_mg} - ideal que seja próximo de 3
    </div>
    <div>
      Relação Ca/K => ${this.nc.ca_k} - ideal que seja próximo de 9
    </div>
    <div>
      Relação Mg/K => ${this.nc.mg_k} - ideal que seja próximo de 3
    </div>
    <div>
      % Ca na CTC: ${this.nc.t_ca} - ideal que seja próximo de 60%
    </div>
    <div>
      %Mg na CTC: ${this.nc.t_mg} - ideal que seja próximo de 15%
    </div>
    <div>
      %K na CTC: ${this.nc.t_k} - ideal que seja próximo de 5%
    </div>
    `;

    // this.classifica_teores();
    this.recAdubacao();
  }

  // classifica_teores() {
  //   const nivel_p = 'baixo';

  // }
  recAdubacao() {
    // console.log(this.qtd_N);

    this.memoria += `
    <div>
      <strong>
        Adubação N =>
      </strong>
        cultivo de ${this.culturaSelected.cultura} com espectativa de produção de ${this.faixaProducaoSelected.producao} ${this.faixaProducaoSelected.unidade}
         => Plantio: ${this.qtd_N.plantio} Kg N/ha

    `;
    if (this.qtd_N.cobertura) {
      this.memoria += `
      e cobertura: ${this.qtd_N.cobertura} Kg N/ha
      `;

    }

    this.memoria += `
    </div>
    `;

    this.memoria += `

<div>
<strong>
  Adubação P<sub>2</sub>O<sub>5</sub> =>
</strong>
  para a o solo ${this.soloSelected.classificacao}, teor de argila próximo a ${this.soloSelected.teorArgila}% e nível de fósforo ${this.class_p.classificacao}, recomenda-se ${this.qtd_P2O5} Kg P<sub>2</sub>O<sub>5</sub>/ha.

  </div>
  <div>
  <strong>
      Adubação K<sub>2</sub>O =>
    </strong>
    para esta faixa de produção, com nível de K considerado ${this.class_k.classificacao} recomenda-se ${this.qtd_K2O} Kg K<sub>2</sub>O/ha
</div>
  `;


  }

  selectPRNT(value) {
    this.prntSelected = this.formCalc.controls.prnt.value;
    this.calculaQtdCalcario()
  }
  calculaQtdCalcario() {
    const prntSelected = this.prntSelected;
    const qtdRecomendade = this.nc.nc;
    const area = this.formCalc.controls.area.value;

    this.calcarioCalculated = Number(Number((qtdRecomendade / Number(prntSelected / 100)) * Number(area)).toFixed(2));
    this.hasCalcCalcario = true;

    this.msgCalcario = `
      <h2>
      <strong>
        Recomendação de calagem
      </strong>
      </h2>
    `;
    this.msgCalcario += `
    - QTD de Calcário = (  NC / PRNT(%)  )  x area (ha) => ( ${qtdRecomendade} / (${prntSelected}/100) ) x ${area} = ${this.calcarioCalculated} (ton);
    `;



  }
  onChangeArea(value) {
    this.calculaQtdCalcario();
  }
  selectCalcario(value) {
    this.calcarioSelected = this.formCalc.controls.corretivo.value;
    this.prntrsCalcarioSelected = this.calcarioSelected.prnt;

  }

  dadosok() {
    return true;
  }
  rateremit(event) {

    this.orientacoes.calagem = this.nc;

    this.orientacoes.area = this.formCalc.controls.area.value;
    this.orientacoes.cultura = this.culturaSelected;
    this.orientacoes.produtividade = this.faixaProducaoSelected;
    this.orientacoes.adubacao = this.FertilizantesCalculated;

    this.orientacoes.consideracoes = {};
    this.orientacoes.consideracoes.ph = this.class_ph;

    this.recomendacoes = this.culturaSelected.recomendacoes;

    const o = this.orientacoes;

    let situacao = '';
    let orientacao = '';
    let recomendacao = '';

    situacao = `De posse do resultado da análise de solo é possível identificar que nesta área de aproximadamente ${Number(o.area) < 10 ? '0' : ''}${Number(o.area).toFixed(0)} ${Number(o.area) > 1 ? 'hectares' : 'hectare'}, ocorre a predominância de solos "${this.soloSelected.classificacao}" onde é cultivado ${o.cultura.cultura} e o proprietário espera que com a correção de solo, obtenha uma produção próxima de ${o.produtividade.producao} ${o.produtividade.unidade}/hectare.
Nestas condições, segue então as recomendações para correção e adubação:`;

    orientacao += `A adubação deve ser feita na época do plantio, de preferência no fundo das covas ou sulcos, incorporando no solo o${o.adubacao.length > 1 ? 's' : ''} seguinte${o.adubacao.length > 1 ? 's' : ''} fertilizante${o.adubacao.length > 1 ? 's' : ''}
    `;
    o.adubacao.map(r => {
      const constPlantio = o.produtividade.n / (o.produtividade.n + o.produtividade.nCobertura);
      const constCobertura = o.produtividade.nCobertura / (o.produtividade.n + o.produtividade.nCobertura);
      if ((r.hasN == true)) {

        const plantio = Number(r.quantidade * constPlantio).toFixed(0);
        const cobertura = Number(r.quantidade * constCobertura).toFixed(0);
        orientacao += `
      -${plantio} Kg de ${r.Fertilizante} no plantio;
      -${cobertura} Kg de ${r.Fertilizante} na cobertura;
      `;
      } else {
        orientacao += `-${Number(r.quantidade).toFixed(0)} Kg de ${r.Fertilizante};
      `;
      }
    })

    if (o.calagem.nc > 0) {
      orientacao += `
Para a correção do solo é necessário realizar a calagem com a aplicação de ${Number(o.calagem.nc) < 1 ? Number(Number(o.calagem.nc) * 1000).toFixed(0).concat(' Kilos') : Number(o.calagem.nc).toFixed(1).concat(' toneladas')} de ${this.calcarioSelected.descricao} com PRNT de ${this.prntSelected}%. Esta aplicação deve ser realizada de 60 a 90 dias antes do plantio para garantir que haja umidade suficiente para ocorrer as reações químicas necessárias para a correção do solo.`;

      if (o.calagem.nc > 3) {
        orientacao += `Como a quantidade é superiores a ${3} toneladas por hectares é necessário parcelar a aplicação e fazer o acompanhamento anual das condições químicas deste solo.
        `;

      }
    }

    if (o.consideracoes.ph.classificacao == 'Acidez elevada') {
      recomendacao += `Este solo possui ${o.consideracoes.ph.classificacao} e isto implica em situações que devem ser observadas:`;

      o.consideracoes.ph.implicacoes.map(i => {
        recomendacao += `${i}, `;
      })
    }


    // console.log(
    // this.orientacoes.class_h = this.class_h);
    // this.orientacoes.class_al = this.class_al;
    // this.orientacoes.class_ca = this.class_ca;
    // this.orientacoes.class_mg = this.class_mg;
    // this.orientacoes.class_k = this.class_k;
    // this.orientacoes.class_ph = this.class_ph;
    // this.orientacoes.class_mo = this.class_mo;
    // this.orientacoes.class_tal = this.class_tal;
    // this.orientacoes.class_v = this.class_v;
    // this.orientacoes.class_T = this.class_T;
    // this.orientacoes.class_t = this.class_t;
    // this.orientacoes.class_p = this.class_p;

    // console.log(this.situacao);
    // console.log(this.orientacoes);
    // console.log(this.recomendacoes);
    // console.log(situacao);
    // console.log(orientacao);
    // console.log(recomendacao);

    const local = '';
    const customers = [];

    const ater: AterModel = {
      local, customers, situacao, orientacao, recomendacao
    };
    /**
     * Registra a ater no cookie
     */
    this._userCache.createAter(JSON.stringify(ater));

    this.onReport(ater);
  }

  onReport(ater) {
    this._router.navigate(["../service/", ater], { relativeTo: this._route });
  }
}
