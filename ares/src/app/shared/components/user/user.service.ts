import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY, of, BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { environment as env } from '../../../../environments/environment.prod';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private PATH: string = 'users';
  private PATH_TASK: string = 'tasks';

  totalTasks$: BehaviorSubject<number>;

  static updateTotalTask = new EventEmitter<Boolean>();
  static updatePanel = new EventEmitter<Boolean>();

  constructor(
    private http: HttpClient,
    private usercache: UserCacheService,
    private router: Router,
  ) { }

  // Obtem as tasks referente a uma visita informada
  tasksByTreatment(id): Observable<any> {

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/tasks-by-treatment/${id}`).pipe(
    );
  }

  // Obtem os projetos de crédito rural referente a uma visita informada
  projectsCrByTreatment(id): Observable<any> {

    return this.http.get(`${env.BASE_API_URL}${this.PATH}/projcr-by-treatment/${id}`).pipe(
    );
  }
  getIndicadoresCepea(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-actual-prices`).pipe(
    );
  }

  getTreatmentsByDate(rangeDate: any[]): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/all-treatments-by-date/${moment(rangeDate[0]).utc().format('yyyy-MM-DD')}/${moment(rangeDate[1]).utc().format('yyyy-MM-DD')}`).pipe(
    );
  }
  getCepeaMilho(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-last-10-milho`).pipe(
    );
  }
  getCepeaCafeArabica(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-last-10-cafe-arabica`).pipe(
    );
  }
  getCepeaCafeRobusta(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-last-10-cafe-robusta`).pipe(
    );
  }
  getCepeaBezerro(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-last-10-bezerro`).pipe(
    );
  }
  updateCepea(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/update-cepea`).pipe(
    );
  }
  reloadCepea(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/reload-cepea`).pipe(
    );
  }
  getCepeaBoi(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-last-10-boi`).pipe(
    );
  }
  getCepeaLeiteMg(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/indicators-last-10-leite`).pipe(
    );
  }
  findById(id: string): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${id}`).pipe(
    );
  }
  allTreatmens() {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/all-treatments`).pipe(
    );
  }
  allCustomers() {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/all-customers`).pipe(
    );
  }

  allProjects(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/all-projects`).pipe(
    );
  }

  consultacep(cep): Observable<any> {
    const CEP_API = `https://viacep.com.br/ws/${cep}/json`;

    return this.http.get(`${CEP_API}`).pipe(
    );
  }
  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
    );
  }

  countTasks(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/count-my-tasks`).pipe(
      filter(t => t['tasks'] > 0)
    );
  }
  myTasks(): Observable<any> {
    //tasks-by-treatment/:id
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/my-tasks`).pipe(
    );
  }

  findByName(name): Observable<any> {

    if (name) {

      const find = name.trim();

      if (find) {
        return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-func/${find}`).pipe(
        );
      }
    }

    return EMPTY;
  };
  sendComments(task): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH_TASK}/add-comment`, task).pipe(
      //      tap(console.log),
    );
  }
  save(usuario) {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, usuario).pipe(
      //      tap(console.log),
    );

  }
  extendUser(id: any) {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/extend/${id}`, null).pipe(
    );
  }
  lockUser(id: any) {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/toggle-lock/${id}`, null).pipe(
    );
  }
  resendLogin(id: any) {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/recovery/${id}`, null).pipe(
    );
  }
  update(id: any, user: any) {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/${id}`, user).pipe(
    );
  }
  finalizarTask(id: string): Observable<any> {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/finalize/${id}`, null).pipe(
      tap(this.atualizaTasks)
    );
  }
  atualizaTasks(value: boolean) {
    UserService.updateTotalTask.emit(true);
    UserService.updatePanel.emit(true);
  }
  cancelarTask(id: string): Observable<any> {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/cancel/${id}`, null).pipe(
      tap(this.atualizaTasks)
    );
  }
  expirarTask(id: string): Observable<any> {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/expire/${id}`, null).pipe(
      tap(this.atualizaTasks)
    );
  }
}

