import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AterModel } from 'src/app/shared/models/ater.model';
import { CULTURAS, PastagemModel } from './pastagem-model';
import { RebanhoModel } from './rebanho-model';

@Component({
  selector: 'dm-pastagens',
  templateUrl: './dm-pastagens.component.html',
  styleUrls: ['./dm-pastagens.component.css']
})
export class DmPastagensComponent implements OnInit {

  @Output() onReport = new EventEmitter();
  
  rebanho: RebanhoModel[] = [];

  culturaSelected: PastagemModel;
  culturas: PastagemModel[] = [];

  form: FormGroup;

  private _areaPiquete: number;
  private _qtdPiquetes: number;
  private _lotacao: number;
  private _consumoAnual: number;
  private _pastagem: string;
  
  private readonly CONSUMO_FORRAGEM: Number = 2.5;
  
  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService,
    private router: Router,
  ) { 
    this.culturas = CULTURAS;
  }

  incluir(value: any){

  }
  remove(value: any){
    this.rebanho = value;
  }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = this.fb.group({
      pasto: ['Mombaça', Validators.required],
      ocupacao: ['1', Validators.required],
      aguas: ['210', Validators.required],
    });

  }
  dadosok(){

    if((this.rebanho.length>0) && ( this.form.valid ) ){
      return true;
    }

    return false;
  }

  calcular(value: any){

    //Calcula a lotação do rebanho
    const lotacao = this.rebanho.reduce(function(total, rb){
      return total + (rb.categoria.ua * rb.quantidade);
    },0);

    const qtd_animais = this.rebanho.reduce(function(total, rb){
      return total + (rb.quantidade);

    },0);

    this._lotacao = Math.round(lotacao);

    //Obtem a produção anual de forragem
    const producao = this.form.controls['pasto'].value;
    this._pastagem = producao['cultura'];

    //Obtem o periodo de ocupacao do pasto
    const ocupacao = this.form.controls['ocupacao'].value;

    //obtem o tempo(dias) necessários para o fornecimento de MS
    const aguas = this.form.controls['aguas'].value;

    //Consumo de forragem em %PV em MS para clima tropical
    const consumo = this.CONSUMO_FORRAGEM;

    //Cálculo
    const prodMs = producao['ms'];
    let necessidadeMs = lotacao*450*(1.8/100);

    //Necessidade de MS para a época das águas
    let necessidadeEpocaAguas = (necessidadeMs*aguas)/(1-0.3);

    //Necessidade de MS para o ano  - Kg de MS por ano para o rebanho informado
    let necessidadeMSano = necessidadeEpocaAguas/(1-0.1);

    this._consumoAnual = Math.round(necessidadeMSano);

    //Cálculo da área necessária

    let areaNecessaria = (necessidadeMSano/1000)/prodMs;

    //Calcula a quantidade de piquete
    const descanso = producao['descanso']

    let qtdPiquetes = (descanso/ocupacao) + 1;
    this._qtdPiquetes = Math.round(qtdPiquetes);

    //Calcula o tamanho do piquete

    let tamanhoPiquete = areaNecessaria*10000/qtdPiquetes;
    this._areaPiquete = Math.round(tamanhoPiquete);

    /* Abrindo modal para exibir os dados */

    this.createTreatment({
      area: areaNecessaria.toFixed(2),
      necessidadeMSano: necessidadeMSano.toFixed(0),
      descanso: descanso,
      qtdPiquetes: qtdPiquetes.toFixed(0),
      tamanhoPiquete: tamanhoPiquete.toFixed(2),
      areaPiquete: this._areaPiquete.toFixed(0),
      cultura: this._pastagem,
      lotacao: this.uaRebanho.toFixed(2),
      cabecas: qtd_animais,
      recomendacao: producao['recs']
    });
    /* finalizando os cálculo */
  }
  async createTreatment(dados: any) {
    
    let situacao = `O produtor procurou atendimento pois entende a necessidade de adequar a alimentação e ofertar um alimento de qualidade para o seu rebanho. Pretende-se dimensionar o pasto com a cultura de ${dados.cultura}`;
    
    let rebanhoTxt = '';
    let i = this.rebanho.length;
    this.rebanho.map(r=>{
      if(i>2){
        rebanhoTxt += ` ${r.quantidade} ${r.categoria.descricao}, `;
      }
      if(i==2){
        rebanhoTxt += `${r.quantidade} ${r.categoria.descricao} e `;
      }
      if(i<2){
        rebanhoTxt += `${r.quantidade} ${r.categoria.descricao} `;
      }
      i--;
    });
    
    situacao += ` para um rebanho composto por ${rebanhoTxt} o que representa uma lotação de ${dados.lotacao} UA (Unidade animal).`

    const local = '';
    
    const customers = [];
    
    let orientacao = ` Desta forma, para esta lotação, a necessidade de matéria seca anual é de aproximadamente ${dados.necessidadeMSano} kg de MS/ano.`;
    if(Number(dados.area)>1){
      orientacao += ` Sendo necessário para isso, uma área total de ${(dados.area)} hectares divididos em ${dados.qtdPiquetes} piquetes de ${dados.areaPiquete} metros quadrados.`;
    }else{
      orientacao += ` Sendo necessário para isso, uma área total de ${(dados.area*10000).toFixed(0)} metros quadrados que serão divididos em ${dados.qtdPiquetes} piquetes de ${dados.areaPiquete} metros quadrados.`;
    }

    orientacao += ``
    orientacao += `${dados.recomendacao}`
    orientacao += ` O sombreamento pode ser natural ou artificial, com área de sombra com tamanho de ${dados.cabecas*10} m2, para que não ocorram acidentes, como animais pisando sobre outros e machucando principalmente tetos e cauda. As áreas de descanso ajudam a evitar o estresse térmico, que pode provocar queda na produção de leite e comprometimento da reprodução. Podem ser planejadas uma ou duas áreas de descanso, conforme a necessidade. O seu posicionamento deve ser tal que os animais não precisem caminhar mais do que 500 m para terem acesso à água, sombra e sal. Se houver necessidade, devem ser construídos corredores de acesso.`
    orientacao += ` O bebedouro e o saleiro também podem ser colocados na área de descanso, em local próximo à sombra, mas não é aconselhável que estejam dentro da área de sombra, porque a presença deles propicia a formação de barro.`
    orientacao += ` A vazão dos bebedouros deve ser dimensionada para suprir pelo menos ${(dados.cabecas * 50)>1000? ((dados.cabecas * 50)/1000).toFixed(1).toString().concat(' mil litros'): ((dados.cabecas * 50)).toString().concat( ' litros')} de água por por dia.`
    orientacao += ` O consumo de sal costuma ser baixo nos sistemas rotacionados e adubados, mas é importante para a nutrição das vacas. De acordo com a época do ano e o tipo de sal, o consumo é próximo a ${(dados.cabecas * 150)>1000? ((dados.cabecas * 150)/1000).toFixed(1).toString().concat(' Kg') : (dados.cabecas * 150).toString().concat(' gramas') } por dia e, portanto, os cochos de sal devem ter tamanho suficiente para a quantidade de sal necessária para suplementação adequada.`
    /**
     * Orienta adubação
     */
    const recomendaAdubacao = await this.calculaAdubacao(dados.lotacao);

    if(recomendaAdubacao){
      orientacao += ` Fazer a 03 adubações anuais com adubação com ${(recomendaAdubacao/0.2).toFixed(0)} Kg de Sulfato de amônio ou ${(recomendaAdubacao/0.48).toFixed(0)} Kg de Uréia. É recomendável fazer a intercalação entre estes dois produtos como uma forma de fornecer Enxofre que também é essencial.`;
    }
    
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
  async calculaAdubacao(lotacao){
    const recomendacao = await Number((((lotacao)-1)*50)/3);
    if(recomendacao>0){
      return recomendacao;
    }
    
    return undefined;
  }
  get uaRebanho(){
    return this.rebanho.reduce(function(total, rb){
      return total + (rb.categoria.ua * rb.quantidade)
    },0);
  }
}
