import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

// export interface CreateConversationDto { 
//   user1: string | object;
//   user2: string | object;
//   messages: object[];
// }

export interface MessageDto { 
  authorFirstName: string;
  authorLastName: string;
  message: string;
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



  getAllConversations$( userId: string ) {
    return this.httpClitent.get(`${environment.apiURL}/conversations/${userId}`, {
      headers: {
        //'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    })
  }

  getConversation$( userId: string, conversationId: string ) {
    return this.httpClitent.get(`${environment.apiURL}/conversations/${userId}/${conversationId}`, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    })
  }

  createConversation$( userId: string, receiverId: string, messageData: string) {
    return this.httpClitent.post(`${environment.apiURL}/conversations/${userId}/create/${receiverId}`, messageData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  sendMessage$( userId: string, conversationId: string, messageData: MessageDto) {
    return this.httpClitent.post(`${environment.apiURL}/conversations/${userId}/${conversationId}`, messageData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  deleteConversation$( userId: string, conversationId: string ) {
    return this.httpClitent.delete(`${environment.apiURL}/conversations/${userId}/${conversationId}`, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  

}
