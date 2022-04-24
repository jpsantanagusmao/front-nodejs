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

  @Output() onRegister = new EventEmitter();

  representative: any;
  city: any;

  formProject: FormGroup;

  @Input() project: Project;
  
  form: FormGroup;
  actions: Action[] = [];
  action: Action;


  constructor(
    private _usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    if(this.id){
      this.changeFormData();
    }else{
      this.createFormNew();
    }
  }

  async changeFormData() {
    const obj = this;
    await this.createFormNew();

    let data;

    this._projectService.findById(this.id).subscribe(
      dataproject => {
        obj.project = dataproject[0];
        obj.representative = {id: dataproject[0].representative_id};
        obj.city = {city: dataproject[0].city.split('/')[0], uf: dataproject[0].city.split('/')[1]};

        console.log(obj.project);
        obj._projectService.findActionsByProject(dataproject[0].id).subscribe(
          data=>{
            obj.actions=data;
          }
        );
        obj.updateForm(dataproject);
      }
    );

  }
  updateForm(data){
    const project = data[0];

    this.form.controls.description.patchValue(project['description'])
    this.form.controls.publicoAlvo.patchValue(project['publicoAlvo'])
    this.form.controls.justificativa.patchValue(project['justificativa'])
    this.form.controls.resultado.patchValue(project['resultado'])
    this.form.controls.objetivo.patchValue(project['objetivo'])
    this.form.controls.city.patchValue(project['city'])
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
    this.project.actions = this.actions;

    this.project.representative_id = this.representative.id;
    this.project.city = `${this.city.city}/${this.city.uf}`;


    this.onRegister.next(this.project);
  }
  cancelar(){
    this._usercache.gotoHome();
  }
} 
