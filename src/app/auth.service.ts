import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IUser } from './share/interfaces/user';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


export interface CreateUserDto { username: string, email: string, password: string }

@Injectable()
export class AuthService {
  
  newUser: any;

  //private _currentUser = new BehaviorSubject<IUser>(undefined);
  private _currentUser = new BehaviorSubject(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  
// get isLogged() {
//   return !!this.currentUser;
// }

get isParent() {    // TODO
    // currentUser$: Observable = this.currentUser$
    // return this.currentUser$.type == 'parent' 
    return true;
    // return this.currentUser$.pipe(take(1), map(currentUser => {
    //   if ( !!currentUser && currentUser.userType == 'parent') {
    //     const userType = currentUser.userType
    //     return true;
    //   }
    // }))
}

get accessToken() {
  return this.newUser.accessToken;
}

get isNanny() {       // TODO
    // return this.currentUser?.type == 'nanny' 
    return false;
}

constructor(private httpClient: HttpClient) {
  console.log('UserService#constructor')
}

register$(userData: CreateUserDto) {
    return this.httpClient.post(`${environment.apiURL}/user/register`, userData, { observe: 'response' })
          .pipe(
            tap(response => console.log(response)),
            map(response => response.body),
            tap(user => this.newUser = user),
            tap(user => console.log(user)),
          
          )
      }  

    

  login$(userData: { email: string, password: string }) {
    return this.httpClient
      .post(`${environment.apiURL}/user/login`, userData, { observe: 'response' })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body),
        tap(user => this.newUser = user)
      )
  }  
 
  logout$() {
    return this.httpClient.get(`${environment.apiURL}/user/logout`)
    //.pipe(tap(this.currentUser = undefined))
  }

  // handleLogin(newUser: IUser) {
  handleLogin(newUser: any) {
    this._currentUser.next(newUser);
  }
    
  handleLogout() {
      this._currentUser.next(undefined);
  }
   
}