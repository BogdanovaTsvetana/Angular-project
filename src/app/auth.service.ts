import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, ICurrentUser } from './share/interfaces/user';
import { IrootState } from './+store/reducers';
import { Store } from '@ngrx/store';
import { login, logout, updateUser } from './+store/actions';

export interface CreateUserDto { 
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string 
}

export interface EditUserDto { 
  firstName: string, 
  lastName: string, 
  email: string, 
}

@Injectable()
export class AuthService {
  
  currentUser$ = this.store.select(globalState => globalState.currentUser)
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  get currentUser() {
    return this.currentUser$.subscribe();
  }

  get accessToken() {
    let tok = undefined;
    this.currentUser$.pipe(map(user => user?.accessToken)).subscribe(t => tok = t);
    return tok;
  }
  
  get userId(){
    let id = undefined;
    this.currentUser$.pipe(map(user => user?._id)).subscribe(i => id = i);
    return id;
  }  

  constructor(private httpClient: HttpClient, private store: Store<IrootState>) {  }

  register$(userData: CreateUserDto): Observable<ICurrentUser> {
    return this.httpClient.post<ICurrentUser>(`${environment.apiURL}/user/register`, userData)  
  }  

  login$(userData: { email: string, password: string }): Observable<ICurrentUser> {
    return this.httpClient
      .post<ICurrentUser>(`${environment.apiURL}/user/login`, userData)
  }  

  logout$() {
    return this.httpClient.get(`${environment.apiURL}/user/logout`, {
      headers: {
        'X-Authorization': `${this.accessToken}`,
      }
    })
  }

  handleLogin(newUser: ICurrentUser) {
    this.store.dispatch(login({ currentUser: newUser}));
  }
    
  handleLogout() {
    this.store.dispatch(logout());
  }

  handleUpdateUser(user: IUser) {
    const updatedCurrentUser = {...user, accessToken: this.accessToken}
    console.log(updatedCurrentUser)
    this.store.dispatch(updateUser({ currentUser: updatedCurrentUser}));
  }

  getProfile$(id: string): Observable<IUser> {  
    return this.httpClient.get<IUser>(`${environment.apiURL}/user/${id}`)
  }

  updateProfile$(userId: string, userData: EditUserDto): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.apiURL}/user/${userId}`, userData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
  }

  deleteUser$(userId: string) {
    return this.httpClient.delete(`${environment.apiURL}/user/${userId}`, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }

}