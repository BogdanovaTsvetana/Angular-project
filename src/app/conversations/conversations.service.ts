import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

// export interface CreateConversationDto { 
//   // _id: string;
//   user1: string | object;
//   user2: string | object;
//   //subject: string ,
//   messages: object[];
//   // __v: string;
// }

// export interface MessageDto { 
//   // _id: string;
//   author: string;
//   message: string;
//   // postDate: string;
//   // __v: string;
// }

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

  createConversation$( userId: string, receiverId: string, messageData: string) {
    return this.httpClitent.post(`${environment.apiURL}/conversations/${userId}/send-message/${receiverId}`, messageData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }
}
