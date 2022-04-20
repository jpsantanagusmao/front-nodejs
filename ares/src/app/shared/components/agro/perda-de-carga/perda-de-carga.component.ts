import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service.js';
import { AterModel } from 'src/app/shared/models/ater.model.js';
import { TUBOS, TBL_CONV, TBL_EFICIENCIA } from './data.js';

@Component({
  selector: 'perda-de-carga',
  templateUrl: './perda-de-carga.component.html',
  styleUrls: ['./perda-de-carga.component.css']
})
export class PerdaDeCargaComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  tubos = TUBOS;
  sistema = TBL_EFICIENCIA;
  sistema_sel: any;
  tubo_sel: any;
  formCalc: FormGroup;

  /* Variáveis a calcular */
  _hman: number;// altura manométrica total
  _vms: number;//velocidade
  _fm: number;//fator de multiplicação

  _trecho: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.formCalc = this.fb.group({
      descricao: ['Linha principal', Validators.required],
      tubo: [''],
      di: [''],
      vazao: ['', Validators.required],
      comprimento: ['100', Validators.required],
      qtdSaida: ['1', Validators.required],
      sistemaIrrigacao: ['', Validators.required],
      difNivel: ['10', Validators.required],
      ps: ['20', Validators.required],
    });
  }
  calcular() {
    /* obtem o tubo informado */
    const tubo = this.formCalc.get('tubo').value;

    /* obtem o coeficiente de rugosidade do tubo selecionado */
    const cf = tubo.k;

    /* calcula a área do tubo e converte para m2*/
    const di = tubo.di;
    const area_tub = (Math.PI * (Math.pow(di / 1000, 2))) / 4;

    /*Calcula a velocidade da agua */
    const form_q = Number(this.formCalc.get('vazao').value)/1000;

    let velocidade = (form_q / 3600) / area_tub;

    /* Calcula a perda de carga por metro linear */
    const h = Math.pow(velocidade / (0.355 * cf * Math.pow(di / 1000, 0.63)), (1 / 0.54));

    /* Calcula o fator de conversão */
    const saidas = this.formCalc.get('qtdSaida').value;
    let ft = TBL_CONV.filter(function (conv) {
      return conv.numSaidas === saidas;
    });

    if (ft.length === 0) {
      ft = TBL_CONV.filter(function (conv) {
        return conv.numSaidas <= saidas;
      });
    }
    let fator = [...ft].pop().fator;

    /* Calcula a perda de carga na linha*/
    const comprimento = this.formCalc.get('comprimento').value;
    const hman = h * comprimento * fator;

    /* Calcula velocidade compensada */

    velocidade = Math.pow(di / 1000, 0.63) * Math.pow((hman / comprimento * fator), 0.54) * (0.355 * cf);

    /* configurando as variáveis calculadas */
    this._fm = fator;
    this._hman = hman;
    this._vms = velocidade;

    /* Abrindo modal para exibir os dados */
    //this.openDialog();
    this._trecho.push({
      descricao: this.formCalc.get('descricao').value,
      comprimento: comprimento,
      vazao: form_q,
      velocidade: velocidade,
      hman: hman
    });
    this.hman_total;
    this.q_max;
    /* finalizando os cálculo */
  }
  get potencia() {

    const htotal = Number(this.hman_total);

    const q = Number(this.q_max);
    const ef = (this.formCalc.controls.sistemaIrrigacao.value).ef;
    return Number((q * htotal) / (75 * ef)).toFixed(2);
  }

  get q_max() {
    const q = this._trecho.reduce((acc, _h) => {
      return acc>Number((_h.vazao || 0))?acc:Number((_h.vazao || 0));
    }, 0);
    return q.toFixed(0);
  }

  get hman_total() {

    let h = Number(this.formCalc.controls.difNivel.value) + Number(this.formCalc.controls.ps.value);
    
    h = h + this._trecho.reduce((acc, _h) => {
      return acc + (Number((_h.hman || 0).toPrecision(6)));
    }, 0);

    /**
     * Adiciona as perdas de carga por gravidade e da pressão de serviço do aspersor
     */
    return h.toFixed(2);
  }

  delete(t) {
    this._trecho.splice(this._trecho.indexOf(t), 1);
  }
  createTreatment() {

    let situacao = `
    Foi solicitado pelo requerente, um dimensionamento de um sistema de irrigação por ${(this.formCalc.controls.sistemaIrrigacao.value).sistemaIrrigacao} de forma que atenda a demanda hídrica para a cultura estabelecida.
    `;

    const local = '';
    const customers = [];
    const orientacao = `
    Com o modelo descrito de acordo com as preferências do produtor, o sistema necessita de um conjunto motobomba com potência de ${this.potencia} cv, capaz de fornecer uma vazão de ${this.q_max} mil litros de água por hora a uma altura manométrica total de ${this.hman_total} mca.
    `;
    const recomendacao = `
    - Obter do órgão competente as devidas licencas para instalação e funcionamento deste sistema; - Certificar-se da oferta/dispnibilidade de água e energia no local da captação para atender o sistema.
    `;

    const ater: AterModel = {
      local, customers, situacao, orientacao, recomendacao
    };
    /**
     * Registra a ater no cookie
     */
    this._userCache.createAter(JSON.stringify(ater));
    this.onReport.emit(true);

  }
}
