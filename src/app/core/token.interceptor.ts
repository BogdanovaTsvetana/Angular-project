import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // get token() {
    
  //   return this.authService.accessToken 
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('lllll')
    // console.log('accessToken ', this.token)

    // request = request.clone({
    //   setHeaders: {
    //  'Content-type': 'application/json',
    //   'X-Authorization': `${this.token}`,
    //   }
    // })
    return next.handle(request);
  }
}
