import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  
 
  
  // get currentUser() {
  //   return this.authService.currentUser;
  // }

  // get userId() {
  //   return this.authService.userId;
  // }

  // get userFirstName() {
  //   return this.authService.userFirstName;
  // }

  // get userLastName() {
  //   return this.authService.userLastName;
  // }


  // get user() {
  //   return this.authService.currentUser;
  // }
  user = undefined;
  conversations: any = [];
  //inboxView: any;

  constructor( 
      private conversationService: ConversationsService,
      private authService: AuthService,
      private router: Router,
      ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(u => this.user = u)
    console.log('user')
    console.log(this.user)
      this.conversationService.getAllConversations$(this.user._id).subscribe({
        next: (conversationsRaw: any) => {

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
            let conversationView = {
                userId: this.user._id,
                conversationId: currentConversation._id,
                otherUserFirstName: '',
                otherUserLastName: '',
                newMessages,
            };
                      
           // check who is the other user
            if ( currentConversation.user1._id == this.user._id ) {
              conversationView.otherUserFirstName = currentConversation.user2.firstName;
              conversationView.otherUserLastName = currentConversation.user2.lastName;
            } else if ( currentConversation.user2._id == this.user._id ) {
              conversationView.otherUserFirstName = currentConversation.user1.firstName;
              conversationView.otherUserLastName = currentConversation.user1.lastName;
            }
    
            this.conversations.push(conversationView);
        }
          // this.conversationns = conversations;
          console.log(this.conversations);
        },
        error: (err) => {
          console.log(err.error.message);
        }
      })



  }

}
