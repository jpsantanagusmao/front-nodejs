import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment as env } from '../../../../environments/environment.prod';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private PATH: string = 'roles';
 
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
//      delay(3000)
    );
  }
  findById(id):Observable<any>{
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/${id}`).pipe(
      //tap(console.log)
    );
  }
}
