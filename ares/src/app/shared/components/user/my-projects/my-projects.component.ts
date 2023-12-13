import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-projects-list',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsListComponent implements OnInit {
  
  @Output() onReport = new EventEmitter();
  
  tasks$: Observable<any>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) {
  }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.loadMyProjects();
  } 

  loadMyProjects() {
    const obj = this;
    this.tasks$ = this._userService.myProjects().pipe(
      // tap(console.log)
    );
  }
  
  hasprojet(){
    return true;
  }

  // TODO: Terminar esta função
  quitTrt(idprojeto, trtok) {
    const obj = this;

    // this._userService.quitarArt(idprojeto, valor).subscribe(sucess => {
    //   obj.loadMyProjects();
    //   obj._messageService.handleSuccess('Registrado efetuado com Sucesso', ``)

    // }, error => {
    //   console.log(error);

    //   obj._messageService.handleWarning('Encerrando Tarefa', 'Item financiado foi cancelado com sucesso.')

    // });
  }
  // TODO: Terminar esta função
  quitDae(idprojeto, rdaok) {

    // const obj = this;
    // this._userService.quitarDae(value).subscribe(sucess => {
    //   obj.loadMyProjects();
    //   obj._messageService.handleSuccess('Registrado efetuado com Sucesso', ``)

    // }, error => {
    //   console.log(error);

    //   obj._messageService.handleWarning('Encerrando Tarefa', 'Item financiado foi cancelado com sucesso.')

    // });

  }
  fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      // console.log('Fallback: Copying text command was ' + msg);
      alert('Número de CPF copiado com sucesso');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  async copyValue(value) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(value);
      return;
    }
    navigator.clipboard.writeText(value).then(function () {

      alert('Número de CPF copiado com sucesso');
    }, function (err) {

      console.error('Async: Could not copy text: ', err);

    });
  }

  onSendComment(id, beneficiario, task) {
    const obj = this;
    this._messageService.showSendComment(id, task, beneficiario).asObservable().pipe(
      take(1),
      //switchMap(async (result) => result ? result : EMPTY)
    )
    .subscribe(
      data=>{
        obj.sendTask(data)
      },
      error=>{
        console.error(error);
      }
    )
    ;
  }

  openproject(idproject){

    this._router.navigate([`../details`], {queryParams: {id: idproject}, relativeTo: this._route });

  }

  sendTask(task){
    //Registra no banco de dados
    this._userService.sendComments(task).subscribe(
      data=>{
        this.loadMyProjects();
      },
      error=>{
        console.error(error);
      }
    );
  }
  onFinalizeTask(id) {
    const obj = this;
    const confirm$ = this._messageService.showConfirm('Conclusão de Tarefa', 'Esta tarefa está concluída?', 'Confirmar', 'Cancelar');
    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.finalizarTask(id) : EMPTY)

    ).subscribe(
      success => {
        obj._messageService.handleSuccess('Conclusão de Tarefa', 'Serviço concluído com sucesso.')
        this.loadMyProjects();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar a baixa neste momento.')
      }
    );

  }
  onCancelTask(id) {

    const obj = this;
    const confirm$ = this._messageService.showConfirm('Cancelar Tarefa', 'Encerrar esta tarefa?', 'Sim', 'Não');

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.cancelarTask(id) : EMPTY)

    ).subscribe(
      success => {
        obj._messageService.handleSuccess('Encerrando Tarefa', 'Serviço cancelado com sucesso.')
        this.loadMyProjects();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Encerrando', 'Não foi possível registrar a baixa neste momento.')
      }
    );

  }
  onExpireTask(id) {
    const obj = this;

    const confirm$ = this._messageService.showConfirm('Conclusão de Tarefa', 'Você define esta tarefa como expirada?', 'Sim', 'Não');

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.expirarTask(id) : EMPTY)

    ).subscribe(
      success => {
        obj._messageService.handleSuccess('Conclusão de Tarefa', 'Registro realizado com sucesso.')
        this.loadMyProjects();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível realizar este registro.')
      }
    );

  }
}
