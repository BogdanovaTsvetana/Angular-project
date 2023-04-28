import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICurrentUser } from '../share/interfaces/user';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            const userData: ICurrentUser = event.body;
            console.log('currentUser: ')
            console.log(userData)
            this.authService.handleLogin(userData);
          } else if (event.url?.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      },
     ));
  }
}

