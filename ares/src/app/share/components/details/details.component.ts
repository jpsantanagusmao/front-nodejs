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
  valorproposta$: Observable<any>;
  valorServicos$: Observable<any>;

  daevl: any;
  txelab: any;

  task: any;
  item: any;

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
    const obj = this;
    const confirm$ = this._messageService.showDialgAddItensFinance();

    confirm$.asObservable().pipe(
      take(1),
    )
      .subscribe(
        data => {
          obj.item = data;
          let id = obj._route.snapshot.queryParamMap.get('id')
          obj.item.idproposta = id;
          obj.registerItem(obj.item);
        },
        error => {
          console.error(error);
          obj._messageService.handleWarning('Encerrando Tarefa', 'Serviço cancelado com sucesso.')
        }
      )
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

  quitTrt(value){
    return;
  }

  registerItem(item) {
    console.log(item);
    const obj = this;
    this._userService.addItem(obj.item).subscribe(sucess => {
      obj.loadData();
      obj._messageService.handleSuccess('Registrado com Sucesso', `${item.descricao}`)

    }, error => {
      console.log(error);

      obj._messageService.handleWarning('Encerrando Tarefa', 'Item financiado foi cancelado com sucesso.')

    });
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

  loadData() {

    const obj = this;

    let id = this._route.snapshot.queryParamMap.get('id')

    this.visita$ = this._userService.taksAndProjectsCrByTreatment(id).pipe(
      tap(data => {
        obj.valorproposta$ = (data.project.itensfinanciados.reduce((acc, i) => {
          return parseFloat(acc) + parseFloat(i.valorTotalItem);
        }, 0));

        obj.valorServicos$ = (data.tasks.reduce((acc, i) => {
          return parseFloat(acc) + (parseFloat(i.valor) * parseFloat(i.qtd));
        }, 0));
        obj.txelab = Number(obj.valorproposta$) * 0.5 / 100;
        obj.daevl = Number(obj.valorServicos$) + obj.txelab;
      })
    );

  }

}
