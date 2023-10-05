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
  //:3355/api/v1/ares-data/simula
  simularsalario(body): Observable<any> {
    //console.log(`${env.BASE_API_URL}ares-data/${this.PATH}`)
    //console.log(body)
    
    return this.http.post(`${env.BASE_API_URL}ares-data/${this.PATH}`, {body: body}).pipe(
      //tap(console.log)
      );
    }

    niveis(): Observable<any> {
      return this.http.get(`${env.BASE_API_URL}ares-data/${this.PATH_NIVEIS}`).pipe(
      //tap(console.log)
    );
  }
}
