import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { environment as env } from '../../../../environments/environment.prod';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private PATH: string = 'users';

  constructor(
    private http: HttpClient,
    private usercache: UserCacheService,
    private router: Router,
  ) { }

  getTreatmentsByDate(rangeDate: any[]): Observable<any> {
    console.log('Localizando');
    console.log(rangeDate);

    console.log(`${env.BASE_API_URL}${this.PATH}/reports/all-treatments-by-date/${moment(rangeDate[0]).utc().format('yyyy-MM-DD')}/${moment(rangeDate[1]).utc().format('yyyy-MM-DD')}`);
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/reports/all-treatments-by-date/${moment(rangeDate[0]).utc().format('yyyy-MM-DD')}/${moment(rangeDate[1]).utc().format('yyyy-MM-DD')}`).pipe(
      //tap(console.log)
    );
  }
  findById(id: string): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${id}`).pipe(
      //tap(console.log)
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
      tap(console.log)
    );
  }
  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
    );
  }

  countTasks(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/count-my-tasks`).pipe(
    );
  }
  myTasks(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/my-tasks`).pipe(
    );
  }

  findByName(name): Observable<any> {

    if (name) {

      const find = name.trim();

      if (find) {
        return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-name/${find}`).pipe(
        );
      }
    }

    return EMPTY;
  };
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
    );
  }
  cancelarTask(id: string): Observable<any> {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/cancel/${id}`, null).pipe(
    );
  }
  expirarTask(id: string): Observable<any> {
    return this.http.put(`${env.BASE_API_URL}${this.PATH}/expire/${id}`, null).pipe(
    );
  }
}

