import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ProdLeiteModel } from '../../models/prod.leite.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-prod-leite-cad',
  templateUrl: './dialog-prod-leite-cad.component.html',
  styleUrls: ['./dialog-prod-leite-cad.component.css']
})
export class DialogProdLeiteCadComponent implements OnInit {
  confirmResult: Subject<ProdLeiteModel>;

  producao: ProdLeiteModel;

  rebanhototal: number = 0;
  totalVacas: number = 0;
  totalVacasOrdenhadas: number = 0;

  valorlitroleite: number = 1;
  reais: number = 1;
  centavos: number = 0;

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
    customensalestimado: new FormControl('0'),
    forrageiratipo: new FormControl(''),
    forrageiraarea: new FormControl('0'),
    maodeobracontratada: new FormControl('0'),

  });

  public constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
  }
  oninput(event) {
    const target = event.target;
    const val = target.value;

    if (target.id == 'rebanho') {

      this.totalVacas = val;
      this.rebanhototal = val;

      this.totalVacasOrdenhadas = val;

    }

    if (target.id == 'vacas') {

      this.totalVacas = val;
      this.totalVacasOrdenhadas = val;

    }

    if (target.id == 'vacasord') {

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
      this.valorlitroleite = Number(this.reais) + Number(this.centavos/100);

  }
  ngOnInit(): void {
    this.confirmResult = new Subject();
    const obj = this;
  }
  onConfirm() {
    const obj = this;
    let producao = this.form.value;
    producao.totalrebanho = this.rebanhototal,
    producao.totalvacas = this.totalVacas,
    producao.totalvacasord = this.totalVacasOrdenhadas,
    producao.precoporlitro = this.valorlitroleite,

    this.producao = producao;


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
