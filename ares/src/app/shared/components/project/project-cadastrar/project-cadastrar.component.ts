import { Project } from './../models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action } from '../models';

@Component({
  selector: 'project-cadastrar',
  templateUrl: './project-cadastrar.component.html',
  styleUrls: ['./project-cadastrar.component.css']
})
export class ProjectCadastrarComponent implements OnInit {
  MESSAGE_PLACE_HOLDER = 'Informe aqui o representante deste departamento';
  form: FormGroup;

  @Input() SERVICE: string;

  @Input() id: string;

  @Output() register = new EventEmitter();

  representative: any;

  formProject: FormGroup;
  project: Project;
  
  formAction: FormGroup;
  actions: Action[] = [];
  action: Action;

  constructor() { }

  ngOnInit(): void {
  }
  onSelectUser(user) {
    this.representative = user;
  }
}
