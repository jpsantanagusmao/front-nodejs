import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AterModel } from 'src/app/shared/models/ater.model.js';
import { HORTALICAS } from './dados-producao';
//import { HORTALICAS } from '../prod-hortalicas/hortalicas.js';
import * as moment from 'moment';
import { data } from 'jquery';

@Component({
  selector: 'prod-hortalicas',
  templateUrl: './prod-hortalicas.component.html',
  styleUrls: ['./prod-hortalicas.component.css']
})
export class ProdHortalicasComponent implements OnInit {
  ater: any;

  @Output() onReport = new EventEmitter();

  //culturas = HORTALICAS;
  culturas = HORTALICAS;
  formCalc: FormGroup;

  /* Variáveis a calcular */
  culturasSelected: any;

  _plantio: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService
  ) {
    this.loadForm();
  }

  ngOnInit(): void {
  }
  async loadForm() {

    const dataInicial = await moment().add(30, 'days').format('YYYY-MM-DD');

    console.log(dataInicial)
    this.formCalc = this.fb.group({
      cultura: ['', Validators.required],
      demanda: ['', Validators.required],
      primeiraEntrega: [dataInicial, Validators.required],
      espacamentoComprimento: ['', Validators.required],
      espacamentoLargura: ['', Validators.required]
    });

  }
  async selectCultura($event) {
    this.culturasSelected = await (this.formCalc.get('cultura').value);
  }
  async calcular() {
    /* obtem a cultura informada */
    const cultura = await (this.formCalc.get('cultura').value);

    /** Área útil a ser plantada em m2 por intervalo de plantio em semanas */
    /**
     *  area total = (demanda semanal / produtividade * intervalo) / 10000
     * 
     */
    console.log(cultura);


    /**
     * 
     * Calculo JP
     */
    //const dtEntrega = await (this.formCalc.get('primeiraEntrega').value);
    const dtEntrega = moment(await (this.formCalc.get('primeiraEntrega').value));
    const unidade = await cultura.unidadeComercializaca.sigla;
    const espLarguraAtual = await (this.formCalc.get('espacamentoLargura').value);
    const espComprimentoAtual = await (this.formCalc.get('espacamentoComprimento').value);
    const especie = cultura.cultura;
    const demanda = await (this.formCalc.get('demanda').value);
    const areaTotalAtual = (await (this.formCalc.get('espacamentoComprimento').value)) * (await (this.formCalc.get('espacamentoLargura').value));
    const areaTotalRecomendada = (cultura.espacamentoRecomendado.comprimentoMin) * (cultura.espacamentoRecomendado.larguraMin);
    const areaParaAtenderDemandaAtual = demanda * areaTotalAtual;
    const areaParaAtenderDemandaRecomendadao = demanda * areaTotalRecomendada;

    const semeadura = moment(dtEntrega).subtract(cultura.tempoProducao, 'days');//.format('DD/MM/yyyy');

    const dadosAnalise = {
      especie,
      unidade,
      dtEntrega,
      demanda,
      areaTotalAtual,
      espLarguraAtual,
      espComprimentoAtual,
      areaParaAtenderDemandaAtual,
      areaParaAtenderDemandaRecomendadao,
      semeadura
    };
    this._plantio.push(dadosAnalise);
    return

    const dem = await Number(this.formCalc.get('demanda').value);
    const area = await ((((dem / cultura.produtividade) * cultura.intervalo)) / 10000);

    /** Área total em m2 por intervalo de plantio em semanas */
    const area_util = 0;

    /** Área de reserva em m2 por ciclo */
    const area_reserva = 0;

    /* Abrindo modal para exibir os dados */
    this._plantio.push({
      cultura: (this.formCalc.get('cultura').value).cultura,
      area: area,
      data: '',
    });
    console.log(JSON.stringify(this._plantio));
    /* finalizando os cálculo */
  }

  delete(t) {
    this._plantio.splice(this._plantio.indexOf(t), 1);
  }
  createTreatment() {
    /**
     * Resolve Situação
     */
    let situacao = ``;
    let itens = 0;//this._plantio.length;
    
    this._plantio.map(pl => {
      
      if (itens <= (this._plantio.length - 2)){
        situacao += pl.especie + ' com espaçamento de '+ pl.espComprimentoAtual +' x '+  pl.espLarguraAtual + ' metros e possui uma demanda semanal de ' + pl.demanda + ' ' + pl.unidade + ' a ser entregue apartir de '+pl.dtEntrega.format('DD/MM/yyyy');
        situacao += ', '

      }else{
        situacao += pl.especie + ' com espaçamento de '+ pl.espComprimentoAtual +' x '+  pl.espLarguraAtual + ' metros e possui uma demanda semanal de ' + pl.demanda + ' ' + pl.unidade + ' a ser entregue apartir de '+pl.dtEntrega.format('DD/MM/yyyy');
      }
      itens ++;
    })
    situacao = `O produtor cultiva ` + situacao;




console.log(situacao);
this.ater = { situacao };

return;
    const local = '';
    const customers = [];
    const orientacao = `
    Com o modelo descrito de acordo com as preferências do produtor, o sistema necessita de um conjunto motobomba com potênciapaz de fornecer uma s de água por hora a uma altura manométrca.
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
