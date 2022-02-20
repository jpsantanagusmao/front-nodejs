import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private PATH: string = 'users';
 
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
      delay(3000),
      tap(console.log)
    );
  }
}

