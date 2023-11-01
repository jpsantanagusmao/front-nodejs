import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AterModel } from 'src/app/shared/models/ater.model';
import { RebanhoModel } from '../dm-pastagens/rebanho-model';
import { PRODUCAO_ESTERCO } from './producao-model';

@Component({
  selector: 'dm-esterqueira',
  templateUrl: './dm-esterqueira.component.html',
  styleUrls: ['./dm-esterqueira.component.css']
})
export class DmEsterqueiraComponent implements OnInit {
  /*
  Dimensionamento de 
  Esterqueira para dejetos bovinos sólidos e líquidos
  */
  SISTEMA_PRODUCAO: any = PRODUCAO_ESTERCO;

  form: FormGroup;
  @Output() onReport = new EventEmitter();

  rebanho: RebanhoModel[] = [];

  constructor(
    private fb: FormBuilder,
    private _userCache: UserCacheService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this._userCache.regRoute().subscribe();

    this.form = this.fb.group({
      sistema: ['', Validators.required],

    });

  }
  incluir(value: any) {

  }
  remove(value: any) {
    this.rebanho = value;
  }

  dadosok() {

    if ((this.rebanho.length > 0) && (this.form.valid)) {
      return true;
    }

    return false;
  }
  calcular(value: any) {
    /**
     * Cálculo, segundo a apresentação do Julio Merlim
     */

    //Para esterqueira de dejetos solidos
    const sistemprod = this.form.controls.sistema.value;
    const totalua = this.uaRebanho;

    let volumesolido = ((sistemprod.producao * totalua) / sistemprod.dds) * sistemprod.tempoArmazenamento;
    
    volumesolido = this.getDims(volumesolido)

    /**
     * Definição das dimensões da caixa de areia para o volume sólido
     */
    const caixaAreia = 0;


    /**
     * Para esterqueira de dejetos solidos
     */
    let volumeliquido = (sistemprod.producao * totalua * sistemprod.tempoArmazenamento) / sistemprod.ddl
    // volumeliquido = this.getDims(volumesolido)
    // alert(`${sistemprod.producao} * ${totalua} * ${sistemprod.tempoArmazenamento} / ${sistemprod.ddl}`);
    
    volumeliquido = this.getDimsTrapezoidal(volumeliquido);

    this.createTreatment({
      sistema: sistemprod.producao,
      lotacao: this.uaRebanho.toFixed(2),
      estsolid: volumesolido,
      cxareia: caixaAreia,
      estliquid: volumeliquido,
    });
  }
  async createTreatment(dados: any) {

    let situacao = `
    Prestando o serviço de assistência ao produtor na necessidade de dimensionar uma uma esterqueira em sistema ${dados.sistema.descricao}.
    `;

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

    situacao += `Seu rebanho é composto por ${rebanhoTxt}, isso equivale a uma lotação de ${dados.lotacao} UA (Unidade animal) a ser manejada em sua propriedade diariamente.`

    const local = '';

    const customers = [];

    let orientacao = `Desta forma, para esta lotação, é necessário realizar a costrução com as seguintes dimensões:
    `;

    /**
     * Orienta adubação
     {altura, largura, comprimento, volume};
     */
    orientacao +=  ` A Estequeira para dejetos sólidos dever ter dimensões de  ${dados.estsolid.altura} metros de altura, ${dados.estsolid.largura} metros de largura, ${dados.estsolid.comprimento} metros de comprimento com capacidade total de armazenamento de ${dados.estsolid.volume} mil litros.`;

    const totalcompartimentos = this.form.controls.sistema.value.tempo / this.form.controls.sistema.value.tempoArmazenamento;
    orientacao += `
    Serão necessários ${ totalcompartimentos } compartimentos de ${dados.estsolid.volume} m³ cada para totalizar os ${ totalcompartimentos * this.form.controls.sistema.value.tempoArmazenamento } dias de tratamento.
    `

    /**
     * {altura, Bmaior, Bmenor, comprimento, volume};
     */
    orientacao +=  `A Estequeira para dejetos líquidos Impede que os dejetos sejam carreados para os cursos d'água subterrâneos e/ou superficiais e dever ser construída em formato trapezoidal com dimensões de ${dados.estliquid.altura} metros de altura, ${dados.estliquid.Bmaior} metros na base maior, ${dados.estliquid.Bmenor} metros na base menor, ${dados.estliquid.comprimento} metros de comprimento com capacidade total de armazenamento de ${dados.estliquid.volume} mil litros.`
    
    let recomendacao = `
    
    `;

    recomendacao += `A Estequeira para dejetos líquidos Utiliza maior quantidade de água, mas que pode ser reaproveitada da lavagem do curral. Antes de encaminhar o efluente proveniente da lavagem do curral diretamente para a esterqueira, ele deve passar por uma caixa de areia.
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

  getDimsTrapezoidal(v): any{
    // altura máxima
    const hlim = 2;
    // largura máxima
    const bmax = 3
    
    let altura = 0;
    let Bmaior = 0;
    let Bmenor = 0;
    let comprimento = 0;

    const r = Math.cbrt(v);
    r > hlim ? altura = 2 : altura = Math.ceil(r);
    r > bmax ? Bmaior = 2 : Bmaior = Math.ceil(r);

    // A base menor e 75% menor que a Bmaior
    Bmenor = Bmaior*0.75;

    comprimento = Number((v / altura / ((Bmaior + Bmenor)/2) ).toFixed(1));
    comprimento = Number(comprimento.toFixed(2));

    // Deve garantir que a altura é o menor valor, depois a largura
    if(altura > Bmaior){
      // se altura for maior que a largura, troca os valores
      const n = altura;
      altura = Bmaior;
      Bmaior = n;
    }

    if(altura > comprimento){
      // se altura for maior que o comprimento, troca os valores
      const n = altura;
      altura = comprimento;
      comprimento = n;
    }

    if(Bmaior > comprimento){
      // se largura for maior que o comprimento, troca os valores
      const n = Bmaior;
      Bmaior = comprimento;
      comprimento = n;
    }

    const volume = ( altura * ( ( Bmaior + Bmenor ) / 2 ) * comprimento ).toFixed(2);

    return {altura, Bmaior, Bmenor, comprimento, volume};
  }

  // A proposta é tornar o mais uniforme possível
  getDims(v): any{

    // altura máxima
    const hlim = 2;
    // largura máxima
    const lmax = 3
    
    let altura = 0;
    let largura = 0;
    let comprimento = 0;

    const r = Math.cbrt(v);
    r > hlim ? altura = 2 : altura = Math.ceil(r);
    r > lmax ? largura = 2 : largura = Math.ceil(r);

    comprimento = Number((v / altura / largura).toFixed(2));

    // Deve garantir que a altura é o menor valor, depois a largura
    if(altura > largura){
      // se altura for maior que a largura, troca os valores
      const n = altura;
      altura = largura;
      largura = n;
    }

    if(altura > comprimento){
      // se altura for maior que o comprimento, troca os valores
      const n = altura;
      altura = comprimento;
      comprimento = n;
    }

    if(largura > comprimento){
      // se largura for maior que o comprimento, troca os valores
      const n = largura;
      largura = comprimento;
      comprimento = n;
    }

    const volume = (altura * largura * comprimento).toFixed(2);

    return {altura, largura, comprimento, volume};
  }
}
