import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


export interface Message{
  text: string,
  type: string,
}

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private _message$ = new Subject<Message>();
  message$ = this._message$.asObservable();

  constructor() { }

  notifyForMessage(message: Message){
    // console.log(message)
    this._message$.next(message);
  }

  clearMessage(): void{
    this._message$.next(undefined);
  }
}
