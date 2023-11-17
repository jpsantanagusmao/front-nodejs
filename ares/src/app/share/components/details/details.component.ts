import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { tap, delay, take, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, pipe } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  visita$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  addProject(id){

  }
  addTask(id) {

    const obj = this;
    const confirm$ = this._messageService.showDialgoAddTask();

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => result ? obj._userService.addTask(id) : EMPTY)

    ).subscribe(
      success => {
        obj._messageService.handleSuccess('Encerrando Tarefa', 'Serviço cancelado com sucesso.')
        
        // Atualizar dados
        obj.loadData();
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Registrando Serviço', 'Não foi possível registrar o novo serviço neste momento.')
      }
    );

  }

  loadData() {
    let id = this._route.snapshot.queryParamMap.get('id')
    const obj = this;

    this.visita$ = this._userService.taksAndProjectsCrByTreatment(id);

  }

}
