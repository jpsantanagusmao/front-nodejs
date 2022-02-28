import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertMessagesService } from './alert-messages.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private messageService: AlertMessagesService
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token))
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse)=>{
          console.log('error.error');
          console.log(error.error);

          if(error.error instanceof Error){
            console.error(error)
            this.messageService.handleError('Ocorreu um erro', error.error.message);
            
          }else{
            console.error(error.error);
            this.messageService.handleError(error.error.name, error.error.message);
            
          }
          //return EMPTY;
          return next.handle(req);
        })
        );
      } else {
        return next.handle(req).pipe(
          catchError((e)=>{
            if(e.error.message){
              this.messageService.handleError( e.error.name, e.error.message);
            }else{
              this.messageService.handleError('Erro de conexão', 'Tente mais tarde!');
            }

          return next.handle(req);
        })
      );
    }
  }
}
