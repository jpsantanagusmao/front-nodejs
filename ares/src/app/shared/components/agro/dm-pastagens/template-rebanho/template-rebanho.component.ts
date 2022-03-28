import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria, CATEGORIAS, RebanhoModel } from '../rebanho-model';

@Component({
  selector: 'template-rebanho',
  templateUrl: './template-rebanho.component.html',
  styleUrls: ['./template-rebanho.component.css']
})
export class TemplateRebanhoComponent implements OnInit {

  categoria: Categoria[] = [];

  @Input() rebanho: RebanhoModel[] = [];

  @Output() updated = new EventEmitter();
  
  //Animal do rebanho em edição
  animalSelected: RebanhoModel;

  formCalc: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { 
    this.categoria = CATEGORIAS;
  }

  ngOnInit(): void {
    this.formCalc = this.fb.group({
      categoria: ['', Validators.required],
      quantidade: ['', Validators.required],
    });

  }
  incluir(value: any){
    
    event.preventDefault();

    const catAnimal: RebanhoModel = this.formCalc.value;
        
    console.log(this.formCalc.value);

    //verifica se existe o produtor na lista
    const containing = this.rebanho.find(pr => pr == catAnimal);

    if (!containing) {

      this.rebanho.push(catAnimal);
      this.clearForm();

    } else {
      alert("Você já registrou esta categoria animal");
    }

    //emitindo notificação para atualização de serviço
    //this.updated.emit(this.rebanho);
    this.clearForm();
  }
  clearForm() {
    this.animalSelected = null;
    this.formCalc = this.fb.group({
      categoria: ['', Validators.required],
      quantidade: ['', Validators.required],
    });    
  }
  calcular(value: any){
    this.updated.emit(this.rebanho);
  }
}