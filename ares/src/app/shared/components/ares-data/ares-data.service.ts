import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AresDataService {
  
  private PATH: string = 'ares-data/titulos';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  findTitulos(nome): Observable<any> {
    let params = new HttpParams();
    params = params.append('prop', nome);
console.log(params)
    //return this.http.get(`${env.BASE_API_URL}${this.PATH}/${nome}`).pipe()
    return this.http.get(`http://localhost:3000/api/v1/${this.PATH}`, {params: params}).pipe(
    )
    ;
  }
}
