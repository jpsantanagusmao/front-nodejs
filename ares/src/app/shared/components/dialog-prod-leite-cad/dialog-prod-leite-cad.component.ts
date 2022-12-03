import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, MODAL_CONFIG_DEFAULT_OVERRIDE } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ProdLeiteModel } from '../../models/prod.leite.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SUPLEMENTACAO } from './suplementacao.model';
import { FORRAGEIRAS } from './forrageiras.model';
import { CUSTOOPERACIONAL } from './custooperacionalclasses.model';
import { MAO_DE_OBRA } from './maodeobra.model';
import { AlertMessagesService } from '../../services/alert-messages.service';

@Component({
  selector: 'app-dialog-prod-leite-cad',
  templateUrl: './dialog-prod-leite-cad.component.html',
  styleUrls: ['./dialog-prod-leite-cad.component.css']
})
export class DialogProdLeiteCadComponent implements OnInit {
  confirmResult: Subject<ProdLeiteModel>;


  SUPLEMENTACAO_DATA = SUPLEMENTACAO;
  FORRAGEIRA_DATA = FORRAGEIRAS;
  CUSTOOPERACIONAL_DATA = CUSTOOPERACIONAL;
  MAO_DE_OBRA_DATA = MAO_DE_OBRA;
  
  producao: ProdLeiteModel;

  rebanhototal: number = 0;
  totalVacas: number = 0;
  totalVacasOrdenhadas: number = 0;

  valorlitroleite: number = 0;
  reais: number = 0;
  centavos: number = 0;
  areaForragem = 0;

  @Input() title: string = 'Registro de produção de leite';


  form = new FormGroup({

    totalrebanho: new FormControl('0'),
    totalvacas: new FormControl('0'),
    totalvacasord: new FormControl('0'),
    producaodiaria: new FormControl('0'),
    precoporlitro: new FormControl('0'),
    suplementacao: new FormControl(''),
    percentvendabezerros: new FormControl('0'),
    percentboigordo: new FormControl('0'),
    custoopmensal: new FormControl(''),
    forrageiratipo: new FormControl(''),
    forrageiraarea: new FormControl('0'),
    maodeobrautilizada: new FormControl(''),

  });

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _messageService: AlertMessagesService
  ) {
  }
  onInputAreaForragem(event){
    const target = event.target;
    const val = target.value;
    this.areaForragem = val;
  }
  oninput(event) {
    const target = event.target;
    const val = target.value;

    if (target.id == 'rebanho') {

      this.totalVacas = 0;//val;
      this.rebanhototal = val;

      this.totalVacasOrdenhadas = 0;//val;

    }

    if (target.id == 'totalvacas') {

      this.totalVacas = val;
      this.totalVacasOrdenhadas = 0;//val;

    }

    if (target.id == 'totalvacasord') {

      this.totalVacasOrdenhadas = val;

    }

  }
  onupdateprice(event) {

      const target = event.target;
      if(target.id == 'precocentavos'){
        this.centavos = target.value;
      }
      if(target.id == 'precoreais'){
        this.reais = target.value;
      }
      this.valorlitroleite = Number(((Number(this.reais) + Number(this.centavos/100))).toFixed(2));

  }
  ngOnInit(): void {
    this.confirmResult = new Subject();
    const obj = this;
  }

  formok(producao){
    /**
     Faz a verificação das variaveis se foram configuradas corretamente e valida o formulário
     * 
     */
    const msghead = 'Registros incompletos';

    if(producao.totalrebanho <= 1){
      let msg = 'O Rebanho total não pode ser zero para este registro.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }
    
    if((producao.totalvacas > producao.totalrebanho)){
      let msg = `Total de vacas não pode ser maior que ${producao.totalrebanho}`;
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }
    
    if((producao.totalvacas < producao.totalvacasord)){
      let msg = `Não é possível haver mais de ${producao.totalvacas} vacas ordenhadas`;
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }
    
    if(producao.producaodiaria == 0){
      let msg = 'A produção diária de leite não pode ser 0.00';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    if(producao.precoporlitro == 0){
      let msg = 'Preço do leite não pode ser 0.00';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    if(this.form.controls['suplementacao'].value == ''){
      let msg = 'Informe se o produtor administra o uso de concentrado no campo "suplementação"';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
      
    }
    
    if(this.form.controls['custoopmensal'].value == ''){
      let msg = 'Informe o custo operacional mensal';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
      
    }

    if(this.form.controls['forrageiratipo'].value == ''){
      let msg = 'Informe o tipo de forrageira';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }

    if((this.form.controls['forrageiraarea'].value == '0') && (this.form.controls['forrageiratipo'].value != 'nenhum')){
      let msg = 'Você precisa informar a área destinada ao cultivo de forrageiras.';
      this._messageService.handleError(msghead, `${msg}`);
      return false;
    }
    if((this.form.controls['forrageiraarea'].value > 0) && (this.form.controls['forrageiratipo'].value == 'nenhum')){
      let msg = 'Se não possui forrageiras, a área deve ser 0. O registro será ajustado a esta condição.';
      this._messageService.handleWarning(msghead, `${msg}`);
      this.form.controls['forrageiraarea'].setValue(0);
      this.areaForragem = this.form.controls['forrageiraarea'].value;

      return false;
    }

    if(this.form.controls['maodeobrautilizada'].value == ''){
      let msg = 'Informe a mao de obra utilizada';
      this._messageService.handleError(msghead, `${msg}`);
      return false;

    }
    return true;
  }
  onConfirm() {
    const obj = this;
    let producao = this.form.value;
    producao.totalrebanho = this.rebanhototal,
    producao.totalvacas = this.totalVacas,
    producao.totalvacasord = this.totalVacasOrdenhadas,
    producao.precoporlitro = this.valorlitroleite,

    this.producao = producao;

    if(!this.formok(this.producao)){
      return;
    }

    this._confirmAndClose(this.producao);
  }

  onClose() {
    this._confirmAndClose(undefined);
  }
  
  private _confirmAndClose(value: ProdLeiteModel) {
    try {
      this.confirmResult.next(value);
    } catch (e) {
      this.confirmResult.next(undefined);
    }

    this.bsModalRef.hide();

  }
}
