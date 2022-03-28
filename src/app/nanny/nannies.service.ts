import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NanniesService {
  nannies = [
    {id: 1, name: 'Maya', description: 'Maya is a nanny', drivingLicence: 'yes', gender: 'male'},
    {id: 2, name: 'Liz', description: 'Liz is a nanny', drivingLicence: 'no', gender: 'female'},
    {id: 3, name: 'Shaz', description: 'Shaz is a nanny', drivingLicence: 'yes', gender: 'female'},
  ]

  constructor() { }

  getNannyDetails(id: number) {
    return this.nannies.find(x => x.id == id);
  }

  
}
