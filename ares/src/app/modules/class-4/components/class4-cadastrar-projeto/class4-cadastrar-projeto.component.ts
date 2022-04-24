import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { ProjectService } from 'src/app/shared/components/project/project.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'app-class4-cadastrar-projeto',
  templateUrl: './class4-cadastrar-projeto.component.html',
  styleUrls: ['./class4-cadastrar-projeto.component.css']
})
export class Class4CadastrarProjetoComponent implements OnInit {

  constructor(
    private _usercache: UserCacheService,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
  }
  onRegister(project) {

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
}
