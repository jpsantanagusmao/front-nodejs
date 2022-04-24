import { EMPTY, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment.prod';
import { Action } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PATH: string = 'projects';
  private PATH_CITY: string = 'cities';

  constructor(
    private http: HttpClient,
  ) { }

  findById(id): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-by-id/${id}`).pipe(
    );
  }

  findActionsByProject(id: string): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-all-actions/${id}`).pipe(
    );
  }
  findCityByName(name): Observable<any> {


    if (name) {

      const find = name.trim();

      if (find) {
        return this.http.get(`${env.BASE_API_URL}${this.PATH_CITY}/find-by-name/${find}`).pipe(
        );
      }
    }

    return EMPTY;
  }

  findMyProjects(): Observable<any> {
    return this.http.get(`${env.BASE_API_URL}${this.PATH}/find-all`).pipe(
    );
  }

  save(project): Observable<any> {
    return this.http.post(`${env.BASE_API_URL}${this.PATH}`, project).pipe(
      //      tap(console.log),
    );

  }
}
