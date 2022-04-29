import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INanny } from '../share/interfaces/nanny';

export interface CreateNannyDto { 
  name: string,
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
  
  constructor(private http: HttpClient) { }

  becomeNanny$( nannyData: CreateNannyDto) {
    return this.http.post(`${environment.apiURL}/list`, nannyData);
  }

  getNanniesAll() {
    return this.http.get(`${environment.apiURL}/list`);
  }

  getNannyById(id: string) {
    return this.http.get(`${environment.apiURL}/list/${id}`);
  }

  editNanny(nannyId: string, updatedNanny: object) {
    
  }
}
