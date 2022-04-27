import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NanniesService {
  nannies = [
    {id: '1', name: 'Maya', years: '30', description: 'Maya is a nanny', workingTime: 'part', drivingLicence: 'yes', gender: 'male', postDate: '20-02-22', image: '//http:lla', user: {}, phone: '0889', likes: ['11', '22'], comments: [{id: '1', author: '11', content: 'asdasd', createdAt: '22/01/22'},
    {id: '2', author: '22', content: 'aqwerty', createdAt: '06/05/21'}]},
    {id: '2', name: 'Liz', years: '30', description: 'Liz is a nanny', workingTime: 'part', drivingLicence: 'no', gender: 'female', postDate: '20-02-22', image: '//http:lla', user: {}, phone: '0889', likes: ['11'], comments: [{id: '1', author: '11', content: 'asdasd', createdAt: '22/01/22'}]},
    {id: '3', name: 'Shaz', years: '30', description: 'Shaz is a nanny', workingTime: 'part', drivingLicence: 'yes', gender: 'female', postDate: '20-02-22', image: '//http:lla', user: {}, phone: '0889', likes: [], comments: []},
  ]

 

  comments = [
    {id: '1', author: '11', content: 'asdasd', createdAt: '22/01/22'},
    {id: '2', author: '22', content: 'aqwerty', createdAt: '06/05/21'}
  ]

  constructor() { }

  getNannyById(id: string) {
    return this.nannies.find(x => x.id == id);
  }

  getNanniesAll() {
    return this.nannies;
  }

  editNanny(nannyId: string, updatedNanny: object) {
    
  }

  
}
