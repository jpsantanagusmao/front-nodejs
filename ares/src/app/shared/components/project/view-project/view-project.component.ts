import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { ProjectService } from '../project.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { Action, Project } from '../models';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  projectId: string;
  MESSAGE_PLACE_HOLDER = 'Informe aqui o responsável por este projeto';
  SERVICE = 'Atualização de projeto';

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
  ) {

  }

  ngOnInit(): void {
    const obj = this;
    this._route.queryParams.subscribe(
      params => {
        this.projectId = params['id'];
      }
    );
  }

  onRegister(project) {
    return;
    this._projectService.save(project).subscribe(
      data => {
        this._messageService.handleSuccess('Projeto', 'Cadastrado com sucesso.')
        this._usercache.gotoHome();
      },
      error => {
        this._messageService.handleError(error.name, error.message);
      }
    );
  }
  cancelar() {
    this._usercache.gotoHome();
  }

}
