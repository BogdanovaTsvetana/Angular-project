import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from './share/interfaces/user';

export interface CreateUserDto { 
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string 
}

@Injectable()
export class AuthService {
  
  newUser: any;

  private _currentUser = new BehaviorSubject(undefined);
  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  
  get userId() {
  return this.newUser._id;
  }

  get accessToken() {
    return this.newUser.accessToken;
    }

  get userFirstName() {
    return this.newUser.firstName;
    }

  get userLastName() {
    return this.newUser.lastName;
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
    let accessToken: string = '';
    this.currentUser$.pipe(map(user => user?.accessToken)).subscribe(v => accessToken = v)
    console.log(accessToken)
    return this.httpClient.get(`${environment.apiURL}/user/logout`, {
      headers: {
        // 'X-Authorization': `${this.accessToken}`,
        'X-Authorization': `${accessToken}`,
      }
    })
  }

  handleLogin(newUser: any) {
    this._currentUser.next(newUser);
  }
    
  handleLogout() {
      this._currentUser.next(undefined);
  }

  getProfile$(id: string): Observable<IUser> {  // TODEL
    return this.httpClient.get<IUser>(`${environment.apiURL}/user/${id}`)
  }

}