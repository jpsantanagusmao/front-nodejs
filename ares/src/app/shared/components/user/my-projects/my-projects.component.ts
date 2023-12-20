import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
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
  ordened = false;

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
      tap(resulst=>obj.ordened=false)
    );
  }
  
  hasprojet(){
    return true;
  }

  orderByDae(){
    const obj = this;

    if(this.ordened==true){
      this.loadMyProjects();
      return;
    }

    this.tasks$ = this._userService.myProjects().pipe(
      map(results => results.sort((a, b) => new Date(a.rdaok).getTime() - new Date(b.rdaok).getTime())),
      tap(results=>obj.ordened = true)
      );
    }
    
    orderByTrt(){
      const obj = this;
    if(this.ordened==true){
      this.loadMyProjects();
      return;
    }
      this.tasks$ = this._userService.myProjects().pipe(
        map(results => results.sort((a, b) => new Date(a.trtok).getTime() - new Date(b.trtok).getTime())),
        tap(results=>obj.ordened = true)
    );

  }
  quitTrt(idprojeto, trtok) {
    const obj = this;
 
    let confirm$;


    if (!trtok) {
      confirm$ = this._messageService.showInput('Informe o valor pago do TRT/ART', '', 'Confirmar', 'Cancelar pagamento');

      confirm$.asObservable().pipe(
        take(1),
      ).subscribe(
        result => {

          if (result == false) {
            obj._messageService.handleWarning('Pagamento suspenso', 'Este pagamento não foi registrado!')

          } else {
            this._userService.quitarArt(idprojeto, result).subscribe(
              sucess => {
                console.log(sucess);
                obj.loadMyProjects();
                obj._messageService.handleSuccess('Pagamento registrado', `Registrado o pagamento no valor de R$ ${sucess.valor}.`)
              }
            );
          }
        },
        error => {
          console.error(error);
          obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar este pagamento.')
        }
        );
        
      } else {
        confirm$ = this._messageService.showConfirm('Cancelar o pagamento desta ART/TRT', '', 'Sim', 'Não Cancelar');

      confirm$.asObservable().pipe(
        take(1),
        ).subscribe(
        result => {
          
          if (result == false) {
            obj._messageService.handleWarning('Pagamento suspenso', 'Este pagamento não foi registrado!')
            obj.loadMyProjects();
          } else {
            this._userService.quitarArt(idprojeto, result).subscribe(
              sucess => {
                console.log(sucess);
                obj.loadMyProjects();
                obj._messageService.handleSuccess('Pagamento cancelado', `Registrado o cancelamento no valor de R$ ${sucess.valor}.`)
              }
            );
          }
        },
        error => {
          console.error(error);
          obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar este pagamento.')
        }
      );


    }
  }
  
  quitDae(idprojeto, rdaok) {

    const obj = this;

    let confirm$;


    if (!rdaok) {

      confirm$ = this._messageService.showInput('Informe o valor pago do DAE', '', 'Confirmar', 'Cancelar pagamento');

      confirm$.asObservable().pipe(
        take(1),
      ).subscribe(
        result => {

          if (result == false) {
            obj._messageService.handleWarning('Pagamento suspenso', 'Este pagamento não foi registrado!')

          } else {
            this._userService.quitarDae(idprojeto, result).subscribe(
              sucess => {
                obj.loadMyProjects();
                obj._messageService.handleSuccess('Pagamento registrado', `Registrado o pagamento no valor de R$ ${sucess.valor}.`)
              }
            );
          }
        },
        error => {
          console.error(error);
          obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar este pagamento.')
        }
      );

    } else {
      confirm$ = this._messageService.showConfirm('Cancelar o pagamento deste DAE', '', 'Sim', 'Não cancelar');

      confirm$.asObservable().pipe(
        take(1),
      ).subscribe(
        result => {

          if (result == false) {
            obj.loadMyProjects();
            obj._messageService.handleWarning('Pagamento suspenso', 'Este pagamento não foi registrado!')
          } else {
            this._userService.quitarDae(idprojeto, result).subscribe(
              sucess => {
                obj.loadMyProjects();
                obj._messageService.handleSuccess('Pagamento cancelado', `Registrado o cancelamento no valor de R$ ${sucess.valor}.`)
              }
            );
          }
        },
        error => {
          console.error(error);
          obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar este pagamento.')
        }
      );


    }

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
