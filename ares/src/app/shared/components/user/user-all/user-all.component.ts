import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/components/user/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';

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
    private userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private messageService: AlertMessagesService,
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.users$ = this.userService.findAll();
  }
  createNew(){
    this.onCreateNew.emit('true');
  }
  onMail(value) {
    this.userService.resendLogin(value).subscribe(
      data => {
        this.messageService.handleSuccess('Renovação de senha', 'Enviado no email cadastrado!');
      },
      error => {
        this.messageService.handleError('Renovação de senha', 'Não foi possível realizar esta operação');
      }
    );
  }

  onEdit(value) {
    this._router.navigate(["./users/private/class7/atualizar", value]);
  }

  onLock(value) {
    const obj = this;
    this.userService.lockUser(value).subscribe(
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
    this.userService.extendUser(value).subscribe(
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
