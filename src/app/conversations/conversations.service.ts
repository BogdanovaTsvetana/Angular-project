import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { IConversation } from '../share/interfaces/conversation';
import { IMessage } from '../share/interfaces/message';

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
    return this.authService.accessToken
  }

  constructor( 
    private httpClitent: HttpClient, 
    private authService: AuthService) { }

  getAllConversations$( userId: string ): Observable<IConversation[]> {
    return this.httpClitent.get<Array<IConversation>>(`${environment.apiURL}/conversations/${userId}`, {
      headers: {
        //'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    })
  }

  getConversation$( userId: string, conversationId: string ): Observable<IConversation> {
    return this.httpClitent.get<IConversation>(`${environment.apiURL}/conversations/${userId}/${conversationId}`, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    })
  }

  createConversation$( userId: string, receiverId: string, messageData: string): Observable<IConversation> {
    return this.httpClitent.post<IConversation>(`${environment.apiURL}/conversations/${userId}/create/${receiverId}`, messageData, {
      headers: {
        'Content-type': 'application/json',
        'X-Authorization': `${this.token}`,
      }
    });
  }

  sendMessage$( userId: string, conversationId: string, messageData: MessageDto): Observable<IMessage> {
    return this.httpClitent.post<IMessage>(`${environment.apiURL}/conversations/${userId}/${conversationId}`, messageData, {
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
