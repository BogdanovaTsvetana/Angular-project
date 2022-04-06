import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
//import { IUser } from './interfaces';

export interface CreateUserDto { username: string, email: string, password: string, memberSince: any }

@Injectable()
export class AuthService {
    loggedIn: boolean = true;
    isAclient: boolean = false;
    isAnanny: boolean = true;

    // users = [
    //     {id: '1', username: 'pepe', password: 'pepe123' },
        
    //   ]

    constructor(private httpClient: HttpClient) {  }  
    // register(userData: { username: string, password: string }){
    //     const { username, password, } = userData;
    //     this.users.push({
    //         id: '2',
    //         username,
    //         password,
    //     })
    //     console.log('in userservice')
    //     console.log(this.users)
    // }

    register$(userData: CreateUserDto): Observable<any> {     // TODO
        return this.httpClient.post<any>(`${environment.apiURL}/user/register`, userData)
      }

    
    login(username: string, password: string){
        
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    isAuthenticated(){
        return this.loggedIn;
    }

    isClient(){
        return this.isAclient;
    }

    isNanny(){
        return this.isAnanny;
    }
}