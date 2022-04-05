import { DivisionService } from './../../../../shared/components/division/division.service';
import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

@Component({
  selector: 'app-class7-cadastrar-division',
  templateUrl: './class7-cadastrar-division.component.html',
  styleUrls: ['./class7-cadastrar-division.component.css']
}) 
export class Class7CadastrarDivisionComponent implements OnInit {
  SERVICE = 'Cadastrar Departamento';
  constructor(
    private _divisionService: DivisionService,
    private _usercache: UserCacheService,
    private _messageService: AlertMessagesService,
  ) { }

  ngOnInit(): void {
  }

  onRegister(event) {
    this._divisionService.create(event).subscribe(
      data=>{
        this._messageService.handleSuccess('Departamento', 'Cadastrado com sucesso.');
        this._usercache.gotoHome();
      },
      error=>{
        this._messageService.handleSuccess('Departamento', 'Falha ao Cadastrar.');
      }
    );
  }
}
