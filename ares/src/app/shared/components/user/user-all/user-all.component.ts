import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from 'src/app/shared/components/user/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {

  users$: Observable<any>;
  _loading: boolean = false;

  @Output() onCreateNew = new EventEmitter();

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _messageService: AlertMessagesService,
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.users$ = this._userService.findAll().pipe(
    );
  }
  createNew() {
    this.onCreateNew.emit('true');
  }
  onMail(value) {

    const obj = this;

    const confirm$ = this._messageService.showConfirm('Reenvio de senha', 'A senha será redefinida e enviado um email com as informações para este usuário', 'Confirmar', 'Cancelar');

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.resendLogin(value) : EMPTY)

    ).subscribe(
      success => {
        obj.loadAll();
        this._messageService.handleSuccess('Renovação de senha', 'Enviado no email cadastrado!');
      },
      error => {
        console.error(error);
        this._messageService.handleError('Renovação de senha', 'Não foi possível realizar esta operação');
      }
    );

  }

  onEdit(value) {
    this._router.navigate(["./users/private/class7/atualizar", value]);
  }

  onLock(value) {
    const obj = this;

    const confirm$ = this._messageService.showConfirm('Bloquear/Desbloquear usuário', 'Será modificado a permissão de acesso para este usuário', 'Confirmar', 'Cancelar');

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.lockUser(value) : EMPTY)

    ).subscribe(
      success => {
        obj.loadAll();
        obj._messageService.handleSuccess('Atualização de bloqueio de usuário', 'Atualizado com sucesso!');
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Atualização de bloqueio', 'Não foi possível realizar esta operação');
      }
    );

  }

  onExtend(value) {
    const obj = this;

    const confirm$ = this._messageService.showConfirm('Extender prazo de utilização', 'A este usuário será extendido a permissão de acesso por mais 90 dias', 'Confirmar', 'Cancelar');

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.extendUser(value) : EMPTY)

    ).subscribe(
      success => {
        obj._messageService.handleSuccess('Extensão de prazo', 'Período extendido com sucesso!');
        obj.loadAll();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Extensão de prazo', 'Não foi possível realizar esta operação');
      }
    );
  }

}
