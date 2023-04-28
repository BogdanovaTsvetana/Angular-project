import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  routeParamObs: Subscription;    // TODO
  conversationId: string | undefined;
  otherUserName: string | undefined;
  // otherUserLastName: string | undefined;
  messages: IMessage[] = [];

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
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
          
          // if ( currentConversation.userName1 == this.userName ) {
          //   conversationView.otherUserName = currentConversation.userName2;
          // } else if ( currentConversation.userName2 == this.userName ) {
          //   conversationView.otherUserName = currentConversation.userName2;
          // }
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

  deleteConversationHandler(): void {
      this.conversationService.deleteConversation$(this.user._id, this.conversationId).subscribe({
        next: () => {
          console.log('deleted');
          // this.router.navigate(['/conversations/inbox']);
        },
        error: (error) => {
          console.error(error.error.message);
        }
      });
  }
}
