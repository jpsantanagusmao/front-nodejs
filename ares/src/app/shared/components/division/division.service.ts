import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private PATH: string = 'divisions';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
      //delay(3000),
      //tap(console.log)
    );
  }
  findById(id):Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${id}`).pipe(
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
}
