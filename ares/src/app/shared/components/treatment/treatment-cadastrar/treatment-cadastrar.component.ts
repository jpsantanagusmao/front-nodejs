import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'treatment-cadastrar',
  templateUrl: './treatment-cadastrar.component.html',
  styleUrls: ['./treatment-cadastrar.component.css']
})
export class TreatmentCadastrarComponent implements OnInit {
  
  form: FormGroup;
  formAction: FormGroup;

  @Input() orientacao: string;
  
  constructor() { }

  ngOnInit(): void {
    if(this.orientacao){
      this.createFormWithOrientacao()
    }else{
      this.createFormNew();
    }
  }

  onIncludeAction(value){
    console.log(JSON.stringify(value.description));
    this.formAction.controls.valor.patchValue(value.valorPorAtendimento);
    this.formAction.controls.descricao.patchValue(value.description);
  }
  onRegisterTreatment(){

  }
  async createFormWithOrientacao() {
    await this.createFormNew();
    this.form.controls.orientacao.patchValue(this.orientacao);
  }
  async createFormNew() {
    const hoje: string = moment().format('YYYY-MM-DD');

    this.form = new FormGroup({
      local: new FormControl('', [Validators.minLength(5), Validators.maxLength(150)]),
      data: new FormControl(hoje),
      situacao: new FormControl(''),
      orientacao: new FormControl(''),
      recomendacao: new FormControl('')
    });

    this.formAction = new FormGroup({
      descricao: new FormControl('', [Validators.minLength(10)]),
      qtd: new FormControl('1', [Validators.min(1)]),
      valor: new FormControl('0', Validators.min(0)),
    });

  }

}
