import { ProjectService } from './../project.service';
import { Project } from './../models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../models';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'project-cadastrar',
  templateUrl: './project-cadastrar.component.html',
  styleUrls: ['./project-cadastrar.component.css']
})
export class ProjectCadastrarComponent implements OnInit {
  MESSAGE_PLACE_HOLDER = 'Informe aqui o responsável por este projeto';

  @Input() SERVICE: string;

  @Input() id: string;

  representative: any;

  formProject: FormGroup;
  project: Project;
  
  form: FormGroup;
  actions: Action[] = [];
  action: Action;

  city: any;

  constructor(
    private _usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.createFormNew();
  }
  async createFormNew() {

    this.form = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
      publicoAlvo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      justificativa: new FormControl(''),
      resultado: new FormControl(''),
      objetivo: new FormControl(''),
      city: new FormControl(''),
    });

  }
  onSelectCity(city){
    this.city = city;
  }
  onSelectUser(user) {
    this.representative = user;
  }
  register(value){
    console.log(value);
    this.action = value;
    this.actions.push(this.action);
  }
  deleteAction(value){
    this.actions = value;
  }
  registrar(){
    /**
     * Configura o projeto
     */
    this.project = this.form.value;
    this.project.representative_id = this.representative.id;
    this.project.actions = this.actions;
    this.project.city = `${this.city.city}/${this.city.uf}`;

    
    console.log(this.project);
    console.log(JSON.stringify(this.project));

    this._projectService.save(this.project).subscribe(
      data=>{
        this._messageService.handleSuccess('Projeto', 'Cadastrado com sucesso.')
        this._usercache.gotoHome();
      },
      error=>{
        this._messageService.handleError(error.name, error.message);
      }
    );
  }
  cancelar(){
    this._usercache.gotoHome();
  }
} 
