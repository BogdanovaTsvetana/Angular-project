import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NanniesService {
  nannies = [
    {name: 'Maya', description: 'Maya is a nanny'},
    {name: 'Liz', description: 'Liz is a nanny'},
    {name: 'Shaz', description: 'Shaz is a nanny'},
  ]

  constructor() { }
}
