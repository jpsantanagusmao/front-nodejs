import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { UserService } from 'src/app/shared/components/user/user.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { tap, delay, take, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of, pipe } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  visita$: Observable<any>;
  valorproposta$: any;//Observable<any>;
  valorServicos$: any;

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

          if (!obj.item) return false;

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
                obj._messageService.handleSuccess('Pagamento registrado', `Registrado o pagamento no valor de R$ ${sucess.trt}.`)
                obj.loadData();
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
      confirm$ = this._messageService.showConfirm('Cancelar o pagamento desta ART/TRT', '', 'Confirmar', 'Cancelar pagamento');

      confirm$.asObservable().pipe(
        take(1),
      ).subscribe(
        result => {

          if (result == false) {
            obj._messageService.handleWarning('Pagamento suspenso', 'Este pagamento não foi registrado!')
            obj.loadData();
          } else {
            this._userService.quitarArt(idprojeto, result).subscribe(
              sucess => {
                obj.loadData();
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
                obj._messageService.handleSuccess('Pagamento registrado', `Registrado o pagamento no valor de R$ ${sucess.valor}.`)
                obj.loadData();
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
      confirm$ = this._messageService.showConfirm('Cancelar o pagamento desta ART/TRT', '', 'Confirmar', 'Cancelar pagamento');

      confirm$.asObservable().pipe(
        take(1),
      ).subscribe(
        result => {

          if (result == false) {
            obj._messageService.handleWarning('Pagamento suspenso', 'Este pagamento não foi registrado!')
            obj.loadData();
          } else {
            this._userService.quitarDae(idprojeto, result).subscribe(
              sucess => {
                obj.loadData();
                obj._messageService.handleSuccess('Pagamento cancelado', `Registrado o cancelamento no valor de R$ ${sucess.trt}.`)
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
  registerItem(item) {
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
  onUnRisk(id) {

    const obj = this;
    this._userService.unriskItem(id).subscribe(sucess => {
      obj.loadData();
      // obj._messageService.handleSuccess('Registrado com Sucesso', `${id}`)

    }, error => {
      console.log(error);

      obj._messageService.handleWarning('Encerrando Tarefa', 'Serviço cancelado com sucesso.')

    });
  }

  onRisk(id) {

    const obj = this;
    this._userService.riskItem(id).subscribe(sucess => {
      obj.loadData();
      // obj._messageService.handleSuccess('Registrado com Sucesso', `${id}`)

    }, error => {
      console.log(error);

      obj._messageService.handleWarning('Encerrando Tarefa', 'Serviço cancelado com sucesso.')

    });
  };

  loadData() {

    const obj = this;

    let id = this._route.snapshot.queryParamMap.get('id')

    this.visita$ = this._userService.taksAndProjectsCrByTreatment(id).pipe(
      tap(data => {
        if (!data.project) {

          obj.valorproposta$ = 0;

        } else {
          obj.valorproposta$ = (data.project.itensfinanciados.reduce((acc, i) => {

            if (!(i.risked)) {
              return parseFloat(acc) + parseFloat(i.valorTotalItem);
            } else {
              return parseFloat(acc) + 0;

            }
          }, 0));
        }
      }),
      tap(data => {
        obj.valorServicos$ = (data.tasks.reduce((acc, i) => {
          return parseFloat(acc) + (parseFloat(i.valor) * parseFloat(i.qtd));
        }, 0));
      }),
      tap(data => {
        if ((Number(obj.valorproposta$) == 0)) {
          obj.txelab = 150.0;
        }
        if ((Number(obj.valorproposta$) <= 30000) && (Number(obj.valorproposta$) > 0)) {
          obj.txelab = 150.0;
        }
        if ((Number(obj.valorproposta$) >= 0)) {
          obj.txelab = Number(obj.valorproposta$) * 0.5 / 100;
        }

        //obj.txelab = Number(obj.valorproposta$) <= 30000 ? 150.00 : Number(obj.valorproposta$) * 0.5 / 100;
        obj.daevl = Number(obj.valorServicos$) + obj.txelab;

      })
    );

  }

}
