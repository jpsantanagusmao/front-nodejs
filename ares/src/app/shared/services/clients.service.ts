import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private PATH: string = 'customers/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  findClient(data): Observable<any> {
   
    const link = `${env.BASE_API_URL}${this.PATH}find`;

    return this.http.get(`${link}/${data}`);
 
  } 
  findServicos(idprodutor): Observable<any> {
   
    const link = `${env.BASE_API_URL}${this.PATH}localizar-servicos`;

    return this.http.get(`${link}/${idprodutor}`);
 
  } 
}