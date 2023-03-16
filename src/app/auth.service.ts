import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser, ICurrentUser } from './share/interfaces/user';
import { IrootState } from './+store/reducers';
import { Store } from '@ngrx/store';
import { login, logout } from './+store/actions';

export interface CreateUserDto { 
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string 
}

@Injectable()
export class AuthService {
  
  newUser: any;

  // Without State Management
  // private _currentUser = new BehaviorSubject<ICurrentUser>(undefined);
  // currentUser$ = this._currentUser.asObservable();

  currentUser$ = this.store.select(globalState => globalState.currentUser);
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

  constructor(private httpClient: HttpClient, private store: Store<IrootState>) {
    console.log('UserService#constructor')
  }

  register$(userData: CreateUserDto): Observable<ICurrentUser> {
    return this.httpClient.post<ICurrentUser>(`${environment.apiURL}/user/register`, userData, { observe: 'response' })
          .pipe(
            tap(response => console.log(response)),
            map(response => response.body),
            tap(user => this.newUser = user),
            tap(user => console.log(user)),
          )
    }  

    
  login$(userData: { email: string, password: string }): Observable<ICurrentUser> {
    return this.httpClient
      .post<ICurrentUser>(`${environment.apiURL}/user/login`, userData, { observe: 'response' })
      .pipe(
        // tap(response => console.log(response)),
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

  handleLogin(newUser: ICurrentUser) {
    // Without State Management
    // this._currentUser.next(newUser);
    this.store.dispatch(login({ currentUser: newUser}));
  }
    
  handleLogout() {
    // Without State Management
    // this._currentUser.next(undefined);
    this.store.dispatch(logout());
  }

  getProfile$(id: string): Observable<IUser> {  // TODEL
    return this.httpClient.get<IUser>(`${environment.apiURL}/user/${id}`)
  }

}