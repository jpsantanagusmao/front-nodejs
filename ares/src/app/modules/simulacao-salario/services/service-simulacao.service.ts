import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment.prod';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceSimulacaoService {
  private PATH: string = 'simula';
  private PATH_NIVEIS: string = 'niveis';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 

  }
  simularsalario(body): Observable<any> {
    //return this.http.post(`${env.BASE_API_URL}${this.PATH}`, body).pipe(
    return this.http.post(`localhost:5000/${this.PATH}`, body).pipe(
      tap(console.log)
      );
    }
    niveis(): Observable<any> {
      //return this.http.get(`${env.BASE_API_URL}${this.PATH_NIVEIS}`).pipe(
      return this.http.get(`localhost:5000/${this.PATH_NIVEIS}`).pipe(
      tap(console.log)
    );
  }
}
