import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if(myToken){
      let token = (myToken.replace(/['"]+/g, ''));
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      })
    }
    return next.handle(request);

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   req = req.clone({
  //     setHeaders: {
  //       'Content-Type' : 'application/json; charset=utf-8',
  //       'Accept'       : 'application/json',
  //       'Authorization': `Bearer ${this.auth.getToken()}`,
  //     },
  //   });

  //   return next.handle(req);
  // }
  // }
}
}