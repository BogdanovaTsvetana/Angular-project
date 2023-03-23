import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { INanny } from '../share/interfaces/nanny';
import { AuthService } from '../auth.service';
import { map, mergeMap, Observable, switchMap } from 'rxjs';

export interface CreateNannyDto { 
  // name: string,
  description: string,
  workingTime: string,
  drivingLicence: string,
  gender: string,
  phone: string,
  image: string,
  user: object | string, 
}

@Injectable({
  providedIn: 'root'
})
export class NanniesService {

  // token: string = undefined;
  
  get accessToken() {
    let tok = undefined;
    this.authService.currentUser$.pipe(map(user => user?.accessToken)).subscribe(t => tok = t);
    console.log('in get accessToken ' + tok)
    return tok;
    }
  // this.authService.currentUser$.pipe(map(user => user?.accessToken)).subscribe(t => tok = t);

  constructor(public authService: AuthService, private http: HttpClient) { }

  becomeNanny$( nannyData: CreateNannyDto) {
    console.log('token: ' + this.accessToken)
    return this.http.post(`${environment.apiURL}/list`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }
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

  getNanniesAll$(time: string, dl: string, gender: string) {
    return this.http.get(`${environment.apiURL}/list?time=${time}&dl=${dl}&gender=${gender}`);
    // return this.http.get(`${environment.apiURL}/list?workingtime=full&dl=yes&gender=male`);
    // return this.http.get(`${environment.apiURL}/list?workingtime=full&dl=yes&gender=male`);
  }

  // loadThemeList(searchTerm: string = ''): Observable<ITheme[]> {
  //   return this.http.get<ITheme[]>(`${apiUrl}/themes?title=${searchTerm}`, {
  //     params: new HttpParams({
  //       fromObject: {
  //       }
  //     })
  //   });
  // }

  getNannyById$(id: string) {
    return this.http.get(`${environment.apiURL}/list/${id}`);
  }

  editNanny$(nannyId: string, nannyData: CreateNannyDto) {
    return this.http.put(`${environment.apiURL}/list/${nannyId}`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }

  likeNanny$(nannyId: string) {
    return this.http.put(`${environment.apiURL}/list/like/${nannyId}`, {}, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
  }

  unlikeNanny$(nannyId: string) {
    return this.http.put(`${environment.apiURL}/list/unlike/${nannyId}`, {}, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    });
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
