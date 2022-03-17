import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'treatment-cadastrar',
  templateUrl: './treatment-cadastrar.component.html',
  styleUrls: ['./treatment-cadastrar.component.css']
})
export class TreatmentCadastrarComponent implements OnInit {
  
  form: FormGroup;
  formAction: FormGroup;

  @Input() orientacao: string;
  
  //ID para esta operação

  id: string = uuidv4()

  //Ações a registrar para este atendimento
  tasks: any[] = [];
  taskSelected: any = {};

  //Beneficiários a registra para este atendimento
  customers: any[] = [];
  customerSelected: any = {};

  //Usuário designado para determinada tarefe
  userDesigned: any = {};

  constructor() { }

  ngOnInit(): void {
    if(this.orientacao){
      this.createFormWithOrientacao()
    }else{
      this.createFormNew();
    }
  }
  onSelectUserDesigned(value){
    if(value){
      this.userDesigned = value.id;
    }
  }
  onSelectCustomer(value){
    console.log(value);
    this.customers.push(value);
  }
  onSelectAction(value){
    this.formAction.controls.descricao.patchValue(value.description, [Validators.minLength(10)]);
    this.formAction.controls.valor.patchValue(value.valorPorAtendimento);
    
    this.taskSelected = this.formAction.value;

    //Determina a chave estrangeira 'action_id"
    this.taskSelected.action_id = value.id;

  }
  onRemoveAction($event){

  }
  onIncludeAction($event){
    const data = this.formAction.value;
    console.log('Antes dos ajuste');
    console.log(JSON.stringify(data));

    const id = this.id;

    data.status = 'OK';
    data.action_id = this.taskSelected.action_id;
    data.userDesigned_id = this.userDesigned;
    
    this.tasks.push(data);
  }

  onRegisterTreatment(){
    const treatment = this.form.value;
    treatment.actions = this.tasks;
    treatment.customers = this.customers;
    
    console.log(treatment);
  }
  onDeleteTask(task){
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  onDeleteCustomer(customer){
    this.customers.splice(this.customers.indexOf(customer), 1);

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

    this.createFormAction();
    
  }
  createFormAction(){
    this.formAction = new FormGroup({
      descricao: new FormControl('', [Validators.minLength(10)]),
      qtd: new FormControl('1', [Validators.min(1)]),
      valor: new FormControl('0', Validators.min(0)),
    });

  }

}
