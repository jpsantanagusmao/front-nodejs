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

@Component({
  selector: 'analise-solo',
  templateUrl: './analise-solo.component.html',
  styleUrls: ['./analise-solo.component.css']
})
export class AnaliseSoloComponent implements OnInit {

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
  corretivos = CORRETIVOS;

  memoria: any = '';
  calculated: boolean = false;

  qtd_N: any;
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
  }

  ngOnInit(): void {
    // this._userCache.regRoute().subscribe();


  }
  // groupBy(xs, key) {
  //   return xs.reduce(function (rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return x[key];
  //   }, {});
  // };

  async solver() {
    const arr = [
      this.fertilizanteNSelected,
      this.fertilizantePSelected,
      this.fertilizanteKSelected
    ]

    // console.log(
    //   this.fertilizanteNSelected
    // );
    // console.log(
    //   this.fertilizantePSelected
    // );
    // console.log(
    //   this.fertilizanteKSelected
    // );

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
      'n': { "min": this.qtd_N.plantio * 100, "max": this.qtd_N.plantio * 150 },
      'nc': { "min": this.qtd_N.cobertura * 100, "max": this.qtd_N.cobertura * 130 },
      'p': { "min": this.qtd_P2O5 * 100 },
      'k': { "min": this.qtd_K2O * 100, "max": this.qtd_K2O * 150 },
    }

    // const variables = {
    //   'n':
    //   {
    //     n: this.fertilizanteNSelected.n || 0,
    //     nc: this.fertilizanteNSelected.n || 0,
    //     p: this.fertilizanteNSelected.p || 0,
    //     k: this.fertilizanteNSelected.k || 0,
    //     preco: 100
    //   },
    //   'nc':
    //   {
    //     n: this.fertilizanteNSelected.n || 0,
    //     nc: this.fertilizanteNSelected.n || 0,
    //     p: this.fertilizanteNSelected.p || 0,
    //     k: this.fertilizanteNSelected.k || 0,
    //     preco: 100
    //   },
    //   'p':
    //   {
    //     n: this.fertilizantePSelected.n || 0,
    //     nc: this.fertilizantePSelected.n || 0,
    //     p: this.fertilizantePSelected.p || 0,
    //     k: this.fertilizantePSelected.k || 0,
    //     preco: 100
    //   },
    //   'k':
    //   {
    //     n: this.fertilizanteKSelected.n || 0,
    //     nc: this.fertilizanteKSelected.n || 0,
    //     p: this.fertilizanteKSelected.p || 0,
    //     k: this.fertilizanteKSelected.k || 0,
    //     preco: 100
    //   }
    // }

    let model: any = {
      optimize,
      constraints,
      variables
    }


    const response = await Solver.Solve(model);
    const obj = []

    unique.forEach(r => {
      Object.keys(response).forEach(k => {
        if (k == r.descricao) {
          obj.push({ 'Fertilizante': k, 'quantidade': response[`${k}`] })
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
    this.soloSelected = this.form.controls.classificacao.value;
    this.classNutrients();
    // console.log(this.soloSelected.class_P);

  }

  selectCultura(event) {
    this.culturaSelected = this.form.controls.cultura.value;
    this.faixaProducao = this.culturaSelected.produtividade;
    this.faixaProducaoSelected = undefined;
    this.classNutrients();
  }

  async classNutrients() {
    await this.classP();
    await this.getN();
    await this.getP();
    await this.getK();

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

    if (element == 'h')
      // this.class_h = await ModelosAdubacao.classElement(element, valor);

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

    this.faixaProducaoSelected = this.form.controls.producao.value;

    const classp = this.classNutrients();

  }

  loadCorretivos() {
    /**
     * Um solo ideal deve apresentar um nível de cálcio (Ca) cerca de 3 vezes maior do que o nível de magnésio (Mg). Vamos usar como exemplo um solo cujo nível de cálcio esteja em 32mmolc/dm³ e de magnésio em 16mmolc/dm³: 32 / 16 = 2. Neste caso, você deve optar pelo calcário calcítico para equilibrar o nível de cálcio no solo.
     * O segundo parâmetro a ser observado é a porcentagem de cálcio na capacidade de troca de cátions (CTC) total. No caso do cálcio, a porcentagem deve estar entre 55 e 60%, enquanto que o magnésio deve estar entre 15 e 20%. Para isso, considere o teor de cálcio/magnésio do solo dividido pela CTC multiplicado por 100. Caso os valores fiquem abaixo e acima dos níveis ideais, respectivamente, você também deve optar pelo calcário calcítico.


    */
    this.corretivos = this.corretivos.filter(f => {
      if (this.nc.ca_mg > f.camg) {
        return f;
      }
    });

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
  loadForm() {


    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
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

    this.formCalc = new FormGroup({
      corretivo: new FormControl('', [Validators.required]),
      prnt: new FormControl('', [Validators.required]),
      fontN: new FormControl('', [Validators.required]),
      fontP: new FormControl('', [Validators.required]),
      fontK: new FormControl('', [Validators.required]),
      area: new FormControl('1', [Validators.required]),
    });


    this.createformVacido();
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
      description: new FormControl('Gleba teste 2', [Validators.required]),
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
  }
  createform2() {
    this.form = new FormGroup({
      description: new FormControl('Gleba teste 2', [Validators.required]),
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
  }
  createform() {
    this.form = new FormGroup({
      description: new FormControl('Gleba teste', [Validators.required]),
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
    this.loadCorretivos();

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

    this.calcarioCalculated = Number(Number((qtdRecomendade / Number(prntSelected / 100)) * Number(area)).toFixed(0));
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
    let texto = `
    Com o resultado a análise de solo, foi possível identificar para uma área de ${o.area} onde cultiva ${o.cultura.cultura}
    e uma produção esperada de ${o.produtividade.producao}. Segue a recomendação de adubação:
    `;
    console.log(o);

    o.adubacao.map(r => {
      texto += `
        ${r.quantidade} Kg de ${r.Fertilizante};
      `;
    })

    if (o.calagem.nc > 0) {
      texto += `
      Para a calagem, aplicar ${o.calagem.nc} de calcário ${this.calcarioSelected.descricao}.
      `;
      if (o.calagem.nc > 3) {
        texto += `
        Para quantidades superiores a ${3} é necessário parcelar a aplicação e fazer o acompanhamento anual das condições químicas deste solon.
        `;

      }
    }

    if(o.consideracoes.ph.classificacao== 'Acidez elevada'){
      texto+= `
      Como este solo se encontra com ${o.consideracoes.ph.classificacao}, implica nas situações que devem ser observadas:
      `;

      o.consideracoes.ph.implicacoes.map(i=>{
        texto += `${i}, `;
      })
    }
    // this.orientacoes.class_h = this.class_h;
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
    console.log(this.orientacoes);
    console.log(this.recomendacoes);
    console.log(texto);

    return true;
  }
  onReport(ater) {
    // this._router.navigate(["../service/", ater],  { relativeTo: this._route });
  }
}
