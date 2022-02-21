import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { environment as env } from '../../../../environments/environment.prod';
import { AlertMessagesService } from '../../services/alert-messages.service';

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

  findAll(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}`).pipe(
      delay(3000),
      tap(console.log)
    );
  }
  save(usuario){
    console.log(usuario);
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, usuario).pipe(
      tap(console.log),
      tap(this.usercache.gotoRoot)
    );

  }
}

