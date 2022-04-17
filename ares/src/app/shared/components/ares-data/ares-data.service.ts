import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AresDataService {


  private PATH: string = 'ares-data';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  findTitulos(nome): Observable<any> {
    let params = new HttpParams();
    params = params.append('prop', nome);

    return this.http.post(`${env.BASE_API_URL}${this.PATH}/titulos`, params).pipe(
    )
      ;
  }
  findModels(words): Observable<any> {

    let params = new HttpParams();
    params = params.append('mapa', words);

    return this.http.post(`${env.BASE_API_URL}${this.PATH}/ater`, params).pipe(

    );
  }
  sendReportAter(rater: any) {
    let params = new HttpParams();
    params = params.append('situacao', rater.situacao);
    params = params.append('orientacao', rater.orientacao);
    params = params.append('recomendacao', rater.recomendacao);

    return this.http.post(`${env.BASE_API_URL}${this.PATH}/send-ater`, params).pipe(
    );
    
  }
}
 