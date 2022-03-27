import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NanniesService {
  nannies = [
    {id: 1, name: 'Maya', description: 'Maya is a nanny'},
    {id: 2, name: 'Liz', description: 'Liz is a nanny'},
    {id: 3, name: 'Shaz', description: 'Shaz is a nanny'},
  ]

  constructor() { }

  getNannyDetails(id: number) {
    return this.nannies.find(x => x.id == id);
  }

  
}
