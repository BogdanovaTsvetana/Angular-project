import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

export interface CreateConversationDto { 
  _id: string;
  user1: string | object;
  user2: string | object;
  //subject: string ,
  messages: object[];
  __v: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  get token() {
    return this.authService.accessToken;
  }

  constructor( 
    private httpClitent: HttpClient, 
    private authService: AuthService) { }

  // createConversation(sendMessage: any) {
  //   console.log('conversationService createConversation')
  //   console.log(sendMessage)
  // }

  createConversation$( conversationData: CreateConversationDto) {
    return this.httpClitent.post(`${environment.apiURL}/conversations`, conversationData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

}
