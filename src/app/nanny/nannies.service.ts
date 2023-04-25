import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { INanny } from '../share/interfaces/nanny';
import { AuthService } from '../auth.service';
import { BehaviorSubject, map, mergeMap, Observable, Subject, switchMap, tap } from 'rxjs';
import { IConversation } from '../share/interfaces/conversation';

export interface CreateNannyDto { 
  description: string,
  workingTime: string,
  drivingLicence: string,
  gender: string,
  phone: string,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class NanniesService {

  // private _currentNanny = new BehaviorSubject<INanny>(undefined);
  // currentNanny$ = this._currentNanny.asObservable();

  get accessToken() {
    return this.authService.accessToken;
  }  
 
  constructor(public authService: AuthService, private http: HttpClient) { }

  becomeNanny$( nannyData: CreateNannyDto): Observable<INanny> {
    return this.http.post<INanny>(`${environment.apiURL}/list`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
    // .pipe(tap(res => this._currentNanny.next(res)));
  }

  getNanniesAll$(time: string, dl: string, gender: string): Observable<INanny[]> {
    const params = new HttpParams()
      .set('time', time)
      .set('dl', dl)
      .set('gender', gender);
    return this.http.get<INanny[]>(`${environment.apiURL}/list`, {params});
    // return this.http.get(`${environment.apiURL}/list?time=${time}&dl=${dl}&gender=${gender}`);
  }

  getNannyById$(id: string): Observable<INanny> {
    return this.http.get<INanny>(`${environment.apiURL}/list/${id}`)
    // .pipe(tap(res => this._currentNanny.next(res)));
  }

  editNanny$(nannyId: string, nannyData: CreateNannyDto): Observable<INanny> {
    return this.http.put<INanny>(`${environment.apiURL}/list/${nannyId}`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
    // .pipe(tap(res => this._currentNanny.next(res)));
  }

  likeNanny$(nannyId: string) {
    console.log(nannyId)
    return this.http.put<INanny>(`${environment.apiURL}/list/like/${nannyId}`, {}, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
    // .pipe(tap(res => this._currentNanny.next(res)));;
  }

  unlikeNanny$(nannyId: string) {
    return this.http.put<INanny>(`${environment.apiURL}/list/unlike/${nannyId}`, {}, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
    // .pipe(tap(res => this._currentNanny.next(res)));
  }

  deleteNanny$(nannyId: string) {
    return this.http.delete(`${environment.apiURL}/list/${nannyId}`, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }

  createComment$(nannyId: string, commentData: any) {
    return this.http.post(`${environment.apiURL}/comments/${nannyId}`, commentData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }

  createConversation$( userId: string, receiverId: string, messageData: string): Observable<IConversation> {
    return this.http.post<IConversation>(`${environment.apiURL}/conversations/${userId}/create/${receiverId}`, messageData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }


////////////

  // becomeNanny$( nannyData: CreateNannyDto, token: string) {
  //   console.log('token: ' + token)
  //   return this.http.post(`${environment.apiURL}/list`, nannyData);
  // }
 // With mergeAll, we subscribe to the observables as they arrive and emit values as they arrive. I
  // becomeNanny$( nannyData: CreateNannyDto) {
  //   return this.authService.accessToken$.pipe(
  //     switchMap( token => {
  //       console.log('token: ' + token)
  //       const accerssToken = token
  //       return  this.http.post(`${environment.apiURL}/list`, nannyData, {
  //         headers: {
  //           'Content-type': 'application/json',
  //           'X-Authorization': `${accerssToken}`,
  //         }
  //       });
        
  //     })
  //   )
    // .subscribe({
    //   next: (nanny) => {
    //     console.log(nanny);
    //     // this.store.dispatch(switchToNanny())  // TODO
    //     // //this.router.navigate(['/nannies']);
    //     // this.router.navigate(['/user/profile']);
    //     return nanny
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // })
   
  

  // this.activatedRoute.params.pipe(
  //   mergeMap( params => {
  //       const nannyId = params['nannyId'];
  //       return this.nanniesService.getNannyById$(nannyId)
  //   })),


  // with token Interceptor
  // getNanniesAll$() {
  //   return this.http.get(`${environment.apiURL}/list`);
  // }

  // getNannyById$(id: string) {
  //   return this.http.get(`${environment.apiURL}/list/${id}`);
  // }

  // editNanny$(nannyId: string, nannyData: CreateNannyDto) {
  //   return this.http.put(`${environment.apiURL}/list/${nannyId}`, nannyData);
  // }

  // likeNanny$(nannyId: string, nannyData: CreateNannyDto) {
  //   return this.http.put(`${environment.apiURL}/list/like/${nannyId}`, nannyData);
  // }

  // deleteNanny$(nannyId: string) {
  //   return this.http.delete(`${environment.apiURL}/list/${nannyId}`);
  // }

  // createComment$(nannyId: string, commentData: any) {
  //   return this.http.post(`${environment.apiURL}/comments/${nannyId}`, commentData);
  // }



}
