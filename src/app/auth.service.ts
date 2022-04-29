import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from './share/interfaces/user';

export interface CreateUserDto { username: string, email: string, password: string }

@Injectable()
export class AuthService {
  
  newUser: any;

  private _currentUser = new BehaviorSubject(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  
  get isParent() {    
    return this.newUser.userType == 'parent'
  }

  get isNanny() {      
    return this.newUser.userType == 'nanny' 
  }

  get accessToken() {
    return this.newUser.accessToken;
  }

  get userId() {
  return this.newUser._id;
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
    return this.httpClient.get(`${environment.apiURL}/user/logout`, {
      headers: {
        'X-Authorization': `${this.accessToken}`,
      }
    })
  }

  handleLogin(newUser: any) {
    this._currentUser.next(newUser);
  }
    
  handleLogout() {
      this._currentUser.next(undefined);
  }

  getProfile$(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiURL}/user/${id}`)
  }

}