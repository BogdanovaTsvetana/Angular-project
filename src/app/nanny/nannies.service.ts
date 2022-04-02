import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NanniesService {
  nannies = [
    {id: '1', name: 'Maya', description: 'Maya is a nanny', drivingLicence: 'yes', gender: 'male', likes: ['11', '22']},
    {id: '2', name: 'Liz', description: 'Liz is a nanny', drivingLicence: 'no', gender: 'female', likes: ['11']},
    {id: '3', name: 'Shaz', description: 'Shaz is a nanny', drivingLicence: 'yes', gender: 'female', likes: []},
  ]

  constructor() { }

  getNannyById(id: string) {
    return this.nannies.find(x => x.id == id);
  }

  getNanniesAll() {
    return this.nannies;
  }

  
}
