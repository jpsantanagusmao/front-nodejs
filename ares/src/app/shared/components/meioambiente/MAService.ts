import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MAService {

  private PATH: string = 'ares-data/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  findByCpf(cpf): Observable<any> {
    console.log(`Buscando dados de ${cpf}`)
    console.log(`${env.BASE_API_URL}${this.PATH}consulta-infracao`)

    return this.http.post(`${env.BASE_API_URL}${this.PATH}consulta-infracao`, {cpf:cpf} ).pipe(
      tap(console.log)
    );
  }
}