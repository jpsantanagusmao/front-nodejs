import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';

import { RebanhoModel } from '../dm-pastagens/rebanho-model';
import { CapineiraModel, CULTURAS } from './capineira-model';
import { AterModel } from 'src/app/shared/models/ater.model';

@Component({
  selector: 'dm-capineira',
  templateUrl: './dm-capineira.component.html',
  styleUrls: ['./dm-capineira.component.css']
})
export class DmCapineiraComponent implements OnInit {

  @Output() onReport = new EventEmitter();

  rebanho: RebanhoModel[] = [];

  culturaSelected: CapineiraModel;
  culturas: CapineiraModel[] = [];

  form: FormGroup;

  private _areaPiquete: number;
  private _qtdPiquetes: number;
  private _lotacao: number;
  private _consumoAnual: number;
  private _pastagem: string;

  epocaTrato = [{
    indice: 1,
    descricao: 'Ano inteiro'
  },
  {
    indice: 0.5,
    descricao: 'Agosto a Dezembro'
  }]
  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService,
    private router: Router,
  ) {
    this.culturas = CULTURAS;
  }

  incluir(value: any) {

  }
  remove(value: any) {
    this.rebanho = value;
  }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = this.fb.group({
      cultura: ['capim elefante', Validators.required],
      eptrato: ['Agosto a Dezembro', Validators.required],
    });

  }
  dadosok() {

    if ((this.rebanho.length > 0) && (this.form.valid)) {
      return true;
    }

    return false;
  }

  calcular(value: any) {

    //Calcula a lotação do rebanho
    const lotacao = this.rebanho.reduce(function (total, rb) {
      return total + (rb.categoria.ua * rb.quantidade);
    }, 0);
    this._lotacao = Math.round(lotacao);

    //Obtem a produção anual de forragem
    const producao = this.form.controls['cultura'].value;

    //Consumo de forragem em %PV em MS para clima tropical
    const epoca_trato = this.form.controls['eptrato'].value;

    //Cálculo

    //const arearequerida = Math.round(producao['prd_anual'] * epoca_trato['indice'])
    let arearequerida = producao['f_ua'] * epoca_trato['indice']

    this.createTreatment({
      area: arearequerida,
      cultura: producao['cultura'],
      lotacao: this.uaRebanho.toFixed(2),
      periodo: epoca_trato
    });
    /* finalizando os cálculo */
  }
  async createTreatment(dados: any) {

    let situacao = `Prestando o serviço de assistência ao produtor na necessidade de dimensionar uma área de capineira com a cultura de ${dados.cultura} onde o mesmo pretende utilizar para alimentação do rebanho`;

    let rebanhoTxt = '';
    let i = this.rebanho.length;
    this.rebanho.map(r => {
      if (i > 2) {
        rebanhoTxt += ` ${r.quantidade} ${r.categoria.descricao}, `;
      }
      if (i == 2) {
        rebanhoTxt += `${r.quantidade} ${r.categoria.descricao} e `;
      }
      if (i < 2) {
        rebanhoTxt += `${r.quantidade} ${r.categoria.descricao} `;
      }
      i--;
    });

    let area = undefined

    if (dados.area <= 1)
      area = (dados.area * 10000).toFixed(0).toString().concat(` metros quadrados`)
    else
      area = dados.area.toFixed(2).toString().concat(` hectares`)

    situacao += ` composto por ${rebanhoTxt}, isso equivale a uma lotação de ${dados.lotacao} UA (Unidade animal) a ser manejada em sua propriedade durante${dados.periodo.indice==1? ' o '.concat(dados.periodo.descricao) : ' os meses de '.concat(dados.periodo.descricao) }.`

    const local = '';

    const customers = [];

    let orientacao = `Desta forma, para esta lotação, é necessário dispor de uma área de aproximadamente ${area} de ${dados.cultura}. `;

    /**
     * Orienta adubação
     */

    orientacao +=  ` A área deve ser preparada no inal do período seco (novembro a dezembro), por meio da limpeza da vegetação, aração e gradagem ou simplesmente gradagem (grade aradora e niveladora) do solo. Caso a vegetação original necessite ser derrubada, a operação seguinte deve ser a destoca, antes do preparo do solo.`
    orientacao +=  ` O plantio deve ser feito logo após as primeiras chuvas. O material de propagação é o colmo (não se usa sementes). Para assegurar maior índice de pega, os colmos do capim devem ser retirados de plantas matrizes com rebrote de 90 a 120 dias.`
    orientacao +=  ` O espaçamento pode ser em distribuição uniforme, de 1,00 ou 1,20 x 0,50 m.`
    orientacao +=  ` Aplicar ${(dados.area * 350).toFixed(0)} kg de Sulfato de amônio, ${(dados.area * 277).toFixed(0)} kg de Superfosfato simples e ${(dados.area * 86).toFixed(0)} kg de cloreto de potássio. Por ocasião do plantio, deve ser aplicado todo o supersimples e metade do sulfato de amônio e do cloreto de potássio. Após o primeiro corte, aplica-se a outra metade, a lanço, sobre as touceiras.`

    const recomendacao = `1) - Realizar a análise de solo e fazer as devidas correções a adubações, principalmente a adubação fosfatada no momento do plantio.
2) - Obter do órgão competente as devidas licencas para instalação e funcionamento deste sistema;
3) - Verificar e adequar as áreas de axploração da atividade em conformidade com a legislação ambiental.
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

  get uaRebanho() {
    return this.rebanho.reduce(function (total, rb) {
      return total + (rb.categoria.ua * rb.quantidade)
    }, 0);
  }
}