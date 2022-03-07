import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PATH: string = 'projects';
  private PATH_CITY: string = 'cities';

  constructor(
    private http: HttpClient,
  ) { }

  findCityByName(name): Observable<any> {
    if(name){
      return this.http.get(`${env.BASE_API_URL}${this.PATH_CITY}/find-by-name/${name}`).pipe(
      );
    }
    return of();
  }
  save(project): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, project).pipe(
      //      tap(console.log),
    );

  }
}
