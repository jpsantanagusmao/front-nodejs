import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { tap, delay, take, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, pipe } from 'rxjs';
import { log } from 'console';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  visita$: Observable<any>;
  task: any;

  constructor(
    private _route: ActivatedRoute,
    private _userCache: UserCacheService,
    private _userService: UserService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  addProject(id) {

  }
  addTask(id) {

    const obj = this;
    const confirm$ = this._messageService.showDialgoAddTask();

    confirm$.asObservable().pipe(
      take(1),
    )
      .subscribe(
        data => {
          obj.task = data;
          let id = obj._route.snapshot.queryParamMap.get('id')
          obj.task.treatment_id = id;
          obj.registerTask(obj.task);
        },
        error => {
          console.error(error);
          obj._messageService.handleWarning('Encerrando Tarefa', 'Serviço cancelado com sucesso.')
        }
      )
  }

  registerTask(task) {
    const obj = this;
    this._userService.addTask(task).subscribe(sucess => {
      obj.loadData();
      obj._messageService.handleSuccess('Registrado com Sucesso', `${task.description}`)

    }, error => {
      console.log(error);

      obj._messageService.handleWarning('Encerrando Tarefa', 'Serviço cancelado com sucesso.')

    });
  }

  get valorProposta() {
    const obj = this;
    return this.visita$.subscribe(dados=>{
      obj.valorProposta = dados.project.itensfinanciados.reduce((i, acc)=>{
        return parseFloat(acc + parseFloat(i.qtditemfinanc) * parseFloat(i.valorunit));
      },0);
    });
  }

  set valorProposta(valor){

  }
  loadData() {

    let id = this._route.snapshot.queryParamMap.get('id')
    this.visita$ = this._userService.taksAndProjectsCrByTreatment(id).pipe(tap(console.log));

  }

}
