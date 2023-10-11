import { AresDataService } from './../ares-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, of } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { AlertMessagesService } from '../../../services/alert-messages.service';
import { AterModel } from 'src/app/shared/models/ater.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-r-ater-recomender',
  templateUrl: './r-ater-recomender.component.html',
  styleUrls: ['./r-ater-recomender.component.css']
})
export class RAterRecomenderComponent implements OnInit {
  form: FormGroup;
  formSearch: FormGroup;

  relatorios$: Observable<any>

  loaded$: Observable<any>

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _raterService: AresDataService,
    private _userCache: UserCacheService,
    private _messageService: AlertMessagesService
  ) { }

  ngOnInit(): void {
    this._userCache.regRoute().subscribe();
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }



  async onSearch() {
    const words = this.form.controls.search.value;

    const obj = this;

    if (this.form.valid) {
      this.relatorios$ = this._raterService.findModels(words).pipe(
        delay(10),
        map(
          (value) => {
            return value;
          }
        ),
      );
    } else {
      alert('Você deve especificar um assunto com pelo menos 5 caracteres')
    }
  }
  onThisSelection(rater) {

    //Abre caixa de confirmação
    const obj = this;
    const situacao = rater.SITUACAO;
    const orientacao = rater.ORIENTACAO;
    const recomendacao = rater.RECOMENDACAO;
    const origin = rater.ID;

    const confirm$ = this._messageService.showRaterConfirm(situacao, orientacao, recomendacao, origin);

    confirm$.asObservable().pipe(
      take(1),
      switchMap(result => {
        return result ? obj.storedRater(result) : EMPTY
      })

    ).subscribe(
      success => {
        //const texto = success.situacao + success.orientacao + success.recomendacao
        obj.sendReportAter(success);
        obj._messageService.handleSuccess('Conclusão de Tarefa', 'Relatório registrado com sucesso.')
      },
      error => {
        console.error(error);
        obj._messageService.handleError('Conclusão de Tarefa', 'Não foi possível registrar a baixa neste momento.')
      }
    );

  }
  sendReportAter(rater) {
    this.onCreateTreatment(rater);
  }

  storedRater(rater): Observable<any> {
    const local = '';
    const customers = [];
    const situacao = rater.situacao;
    const orientacao = rater.orientacao;
    const recomendacao = rater.recomendacao;
    const origin = rater.origin;

    const ater = {
      local,customers, situacao, orientacao, recomendacao, origin
    };
    /**
     * Registra a ater no cookie
     */
    this._userCache.createAter(JSON.stringify(ater));

    const obj = this;

    return this._raterService.sendReportAter(rater).pipe(
    );
  }
  onCreateTreatment(event){
    this._router.navigate(["../service/"],  { relativeTo: this._route });
  }
}
