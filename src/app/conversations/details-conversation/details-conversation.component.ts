import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ConversationsService } from '../conversations.service';
import { ICurrentUser } from 'src/app/share/interfaces/user';
import { IConversation } from 'src/app/share/interfaces/conversation';
import { IMessage } from 'src/app/share/interfaces/message';

@Component({
  selector: 'app-details-conversation',
  templateUrl: './details-conversation.component.html',
  styleUrls: ['./details-conversation.component.css']
})
export class DetailsConversationComponent implements OnInit {

  user: ICurrentUser | undefined;
  userName: string = undefined;
  routeParamObs: Subscription;    
  conversationId: string | undefined;
  otherUserName: string | undefined;

  messages: IMessage[] = [];

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private conversationService: ConversationsService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(u => this.user = u)
    
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.conversationId = param.get('conversationId');
    });

    this.conversationService.getConversation$(this.user._id, this.conversationId).subscribe({
      next: (conversation: IConversation) => {
          this.messages = conversation.messages;
  
           // check who is the other user
           if ( conversation.userName1 == `${this.user.firstName} ${this.user.lastName}` ) {
              this.otherUserName = conversation.userName2;
            } else {
              this.otherUserName = conversation.userName1;
            }       
      },
      error: (error) => {
        console.log(error.error.message);
      }
    })
  }

  sendMessageHandler(sendMessageForm: NgForm): void {
 
    const messageData: { authorFirstName: string, authorLastName: string, message: string } = {
      authorFirstName: this.user.firstName,
      authorLastName: this.user.lastName,
      message: sendMessageForm.value.message,
    }

    this.conversationService.sendMessage$(this.user._id, this.conversationId, messageData).subscribe({
        next: (message) => {
          this.messages = this.messages.concat(message);
          sendMessageForm.reset();
        },
        error: (error) => {
          console.error(error.error.message);
        }
    });
  }
}
