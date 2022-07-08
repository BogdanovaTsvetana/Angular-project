import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { INanny } from '../share/interfaces/nanny';
import { AuthService } from '../auth.service';

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

  get token() {
    return this.authService.accessToken;
  }
  
  constructor(public authService: AuthService, private http: HttpClient) { }

  becomeNanny$( nannyData: CreateNannyDto) {
    return this.http.post(`${environment.apiURL}/list`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  getNanniesAll$() {
    return this.http.get(`${environment.apiURL}/list`);
  }

  getNannyById$(id: string) {
    return this.http.get(`${environment.apiURL}/list/${id}`);
  }

  editNanny$(nannyId: string, nannyData: CreateNannyDto) {
    return this.http.put(`${environment.apiURL}/list/${nannyId}`, nannyData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  deleteNanny$(nannyId: string) {
    return this.http.delete(`${environment.apiURL}/list/${nannyId}`, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  createComment$(nannyId: string, commentData: any) {
    return this.http.post(`${environment.apiURL}/comments/${nannyId}`, commentData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }



}
