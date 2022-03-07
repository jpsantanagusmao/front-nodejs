import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { environment as env } from '../../../../environments/environment.prod';

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

  findById(id: string): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${id}`).pipe(
      //tap(console.log)
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
  findByName(name): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-name/${name}`).pipe(
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
}

