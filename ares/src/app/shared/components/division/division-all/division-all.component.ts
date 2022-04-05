import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { DivisionService } from '../division.service';

@Component({
  selector: 'division-all',
  templateUrl: './division-all.component.html',
  styleUrls: ['./division-all.component.css']
})
export class DivisionAllComponent implements OnInit {
  
  users$: Observable<any>;
  _loading: boolean = false;
  @Output() onCreateNew = new EventEmitter();

  constructor(
    private _divisionService: DivisionService,
    private _router: Router,
    private _route: ActivatedRoute,
    private messageService: AlertMessagesService,
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  createNew(){
    this.onCreateNew.emit('true');
  }
  
  loadAll() {
    this.users$ = this._divisionService.findAll();
  }

  onEdit(value) {
    this._router.navigate(["./users/private/class7/atualizar", value]);
  }

  onLock(value) {
    const obj = this;
    this._divisionService.lockUser(value).subscribe(
      data => {
        this.messageService.handleSuccess('Atualização de bloqueio de usuário', 'Atualizado com sucesso!');
        obj.loadAll();
      },
      error => {
        this.messageService.handleError('Atualização de bloqueio', 'Não foi possível realizar esta operação');
      }
    );
  }

  onExtend(value) {
    const obj = this;
    this._divisionService.extendUser(value).subscribe(
      data => {
        this.messageService.handleSuccess('Extensão de prazo', 'Período extendido com sucesso!');
        obj.loadAll();
      },
      error => {
        this.messageService.handleError('Extensão de prazo', 'Não foi possível realizar esta operação');
      }
    );
  }

} 
