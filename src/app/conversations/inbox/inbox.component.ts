import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IConversation } from 'src/app/share/interfaces/conversation';
import { ICurrentUser } from 'src/app/share/interfaces/user';
import { ConversationsService } from '../conversations.service';

export interface conversationView { 
  userId: string,
  conversationId: string,
  otherUserName: string,
  newMessages: number,
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  user: ICurrentUser = undefined;
  userName: string = undefined;
  conversations: conversationView[] = [];

  constructor( 
      private conversationService: ConversationsService,
      private authService: AuthService,
      private router: Router,
      ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      this.userName = u.firstName + ' ' + u.lastName;
    })
    this.conversationService.getAllConversations$(this.user._id).subscribe({
        next: (conversationsRaw: IConversation[]) => {
        console.log(conversationsRaw)  
        for ( let currentConversation of conversationsRaw ) {
            let newMessages = 0;

            // check if there are new messages from the other user
            for ( let message of currentConversation.messages ) {
                if ((message.read === false) 
                && (message.authorFirstName != this.user.firstName)
                && (message.authorLastName != this.user.lastName)) {
                  newMessages++;
                }
            }

            // info for viewing
            let conversationView: conversationView = {
                userId: this.user._id,
                conversationId: currentConversation._id,
                otherUserName: '',
                newMessages,
            };
                    
           // check who is the other user
            if ( currentConversation.userName1 == this.userName ) {
              conversationView.otherUserName = currentConversation.userName2;
            } else {
              conversationView.otherUserName = currentConversation.userName1;
            }
    
            // this.conversations.push(conversationView);
            this.conversations = [ ...this.conversations, conversationView]
          }
        },
        error: (err) => {
          console.log(err.error.message);
        }
      })
  }
}
