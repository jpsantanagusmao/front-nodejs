import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { UserCacheService } from 'src/app/core/user-cache.service';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SchoolingService {
  private PATH: string = 'schooling';

  constructor(
    private http: HttpClient,
    private usercache: UserCacheService,
    private router: Router,
  ) { }
  findBySchooling(name): Observable<any> {

    if(name){

      const find = name.trim();

      if(find){
        return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-schooling/${find}`).pipe(
        );
      }
      
    }

    return EMPTY;

  }
}
