import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  
  // newUser: any;
  // accessToken: string = '';

  // Without State Management
  // private _currentUser = new BehaviorSubject<ICurrentUser>(undefined);
  // currentUser$ = this._currentUser.asObservable();
  
  currentUser$ = this.store.select(globalState => globalState.currentUser)
    // .pipe(tap(u => this.accessToken = u.accessToken));


  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  // isNanny$ = this.currentUser$.pipe(map(user => user.isNanny))
  // accessToken$ = this.currentUser$.pipe(map(user => user.accessToken));
  // accessToken$ = this.store.select(globalState => globalState.currentUser.accessToken)

  // get userId() {
  // return this.newUser._id;
  // }

  get currentUser() {
    return this.currentUser$.subscribe()
  }

  get accessToken() {
    let tok = undefined;
    this.currentUser$.pipe(map(user => user?.accessToken)).subscribe(t => tok = t);
    console.log('in get accessToken ' + tok)
    return tok;
  }
  
  get userId(){
    let id = undefined;
    this.currentUser$.pipe(map(user => user?._id)).subscribe(i => id = i);
    console.log('in get id ' + id)
    return id;
  }  

    // get accessToken() {
    //   return this.newUser?.accessToken;
    //   }  

  // get userFirstName() {
  //   return this.newUser.firstName;
  //   }

  // get userLastName() {
  //   return this.newUser.lastName;
  // }  

  constructor(private httpClient: HttpClient, private store: Store<IrootState>) {
    console.log('UserService#constructor')
  }

  register$(userData: CreateUserDto): Observable<ICurrentUser> {
    return this.httpClient.post<ICurrentUser>(`${environment.apiURL}/user/register`, userData, { observe: 'response' })
          .pipe(
            tap(response => console.log(response)),
            map(response => response.body),
            // tap(user => this.newUser = user),
            // tap(user => console.log(user)),
          )
    }  

    
  login$(userData: { email: string, password: string }): Observable<ICurrentUser> {
    return this.httpClient
      .post<ICurrentUser>(`${environment.apiURL}/user/login`, userData, { observe: 'response' })
      .pipe(
        // tap(response => console.log(response)),
        map(response => response.body),
        // tap(user => this.newUser = user)
      )
  }  
 
  // logout$() {
  //   let accessToken: string = '';
  //   this.currentUser$.pipe(map(user => user?.accessToken)).subscribe(v => accessToken = v)
  //   console.log(accessToken)
  //   return this.httpClient.get(`${environment.apiURL}/user/logout`, {
  //     headers: {
  //       // 'X-Authorization': `${this.accessToken}`,
  //       'X-Authorization': `${accessToken}`,
  //     }
  //   })

    // logout$() {
    //   let accessToken: string = '';
    //   this.currentUser$.pipe(map(user => user?.accessToken)).subscribe(v => accessToken = v)
    //   // console.log(this.accessToken)
    //   return this.httpClient.get(`${environment.apiURL}/user/logout`, {
    //     headers: {
    //       // 'X-Authorization': `${this.accessToken}`,
    //       'X-Authorization': `${this.accessToken}`,
    //     }
    //   })

      logout$() {
        // let accessToken: string = '';
        // this.currentUser$.pipe(map(user => user?.accessToken)).subscribe(v => accessToken = v)
        // console.log(this.accessToken)
        // return this.httpClient.get(`${environment.apiURL}/user/logout`)

    return this.httpClient.get(`${environment.apiURL}/user/logout`, {
      headers: {
        'X-Authorization': `${this.accessToken}`,
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

  handleUpdateUser(user: IUser) {
    const updatedCurrentUser = {...user, accessToken: this.accessToken}
    console.log(updatedCurrentUser)
    this.store.dispatch(updateUser({ currentUser: updatedCurrentUser}));
  }

  getProfile$(id: string): Observable<IUser> {  // TODEL
    return this.httpClient.get<IUser>(`${environment.apiURL}/user/${id}`)
  }


  updateProfile$(userId: string, userData: EditUserDto): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.apiURL}/user/${userId}`, userData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
    // .pipe(
      // tap(res => {
      //   // const updatedUser = Object.assign(res, this.accessToken)
      //   // this.store.dispatch(updateUser({ currentUser: updatedUser}));
      //   console.log(res)

      //   // this.handleUpdateUser(res);
      //   console.log(res)
      // })
      // tap(res => this.handleUpdateUser(res))
    // );
  
  }

}