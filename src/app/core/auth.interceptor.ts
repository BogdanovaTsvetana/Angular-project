import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICurrentUser, IUser } from '../share/interfaces/user';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        // console.log(event)
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            const userData: ICurrentUser = event.body;
            console.log(userData)
            this.authService.handleLogin(userData);
            console.log('accessToken: ', userData.accessToken)
          } else if (event.url?.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      },
     ));
  }
}

// export interface IUser {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string,
//   password: string;
//   userType: string;
//   nanny: object | string;
//   memberSince: string;
//   inbox: string;
//   favourites: string[];
//   conversations: string[];
//   __v: string;

// }
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       tap(event => {
//         if (event instanceof HttpResponse) {
//           // localhost:3000/api/login || localhost:3000/register
//           if (event.url.endsWith('login') || event.url.endsWith('register')) {
//             console.log('login/register happened');
//             const newlyLoggedUser: IUser = event.body;
//             this.authService.handleLogin(newlyLoggedUser);
//           } else if (event.url.endsWith('logout')) {
//             this.authService.handleLogout();
//           }
//         }
//       },
//      ));
//   }
// }
