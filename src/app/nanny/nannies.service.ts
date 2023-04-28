import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { INanny } from '../share/interfaces/nanny';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
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
  }

  getNanniesAll$(time: string, dl: string, gender: string): Observable<INanny[]> {
    const params = new HttpParams()
      .set('time', time)
      .set('dl', dl)
      .set('gender', gender);
    return this.http.get<INanny[]>(`${environment.apiURL}/list`, {params});
  }

  getNannyById$(id: string): Observable<INanny> {
    return this.http.get<INanny>(`${environment.apiURL}/list/${id}`)
  }

  editNanny$(nannyId: string, nannyData: CreateNannyDto): Observable<INanny> {
    return this.http.put<INanny>(`${environment.apiURL}/list/${nannyId}`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
  }

  likeNanny$(nannyId: string) {
    console.log(nannyId)
    return this.http.put<INanny>(`${environment.apiURL}/list/like/${nannyId}`, {}, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
  }

  unlikeNanny$(nannyId: string) {
    return this.http.put<INanny>(`${environment.apiURL}/list/unlike/${nannyId}`, {}, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.accessToken}`,
      }
    })
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
}
