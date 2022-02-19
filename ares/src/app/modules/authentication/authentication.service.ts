import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, tap} from 'rxjs/operators';
import { environment as env } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private PATH: string = 'users/login';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  autenticar(credencial): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, credencial).pipe(
      //delay(1000),
      //tap(console.log)
    );
    ;
  }
}
