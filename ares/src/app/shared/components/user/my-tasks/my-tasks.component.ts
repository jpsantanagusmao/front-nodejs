import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { UserService } from '../user.service';

@Component({
  selector: 'my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  tasks$: Observable<any>;

  constructor(
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) {
  }

  ngOnInit(): void {
    this.loadMyTasks();
  }
  loadMyTasks() {
    this.tasks$ = this._userService.myTasks().pipe(
    );
  }

  onFinalizeTask(id) {
    const obj = this;
    this._userService.finalizarTask(id).subscribe(
      success => {
        obj._messageService.handleSuccess('Conclusão de Tarefa', 'Serviço concluído com sucesso.')
        this.loadMyTasks();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar a baixa neste momento.')
      }
    );
  }
  onCancelTask(id) {
    const obj = this;
    this._userService.cancelarTask(id).subscribe(
      success => {
        obj._messageService.handleSuccess('Encerrando Tarefa', 'Serviço cancelado com sucesso.')
        this.loadMyTasks();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Encerrando', 'Não foi possível registrar a baixa neste momento.')
      }
    );
  }
  onExpireTask(id) {
    const obj = this;
    this._userService.expirarTask(id).subscribe(
      success => {
        obj._messageService.handleSuccess('Conclusão de Tarefa', 'Serviço concluído com sucesso.')
        this.loadMyTasks();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar a baixa neste momento.')
      }
    );

  }
}
