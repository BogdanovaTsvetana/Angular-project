import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  get userId() {
    return this.authService.userId;
  }

  get userFirstName() {
    return this.authService.userFirstName;
  }

  get userLastName() {
    return this.authService.userLastName;
  }

  conversations: any = [];
  inboxView: any;

  constructor( 
      private conversationService: ConversationsService,
      private authService: AuthService,
      ) { }

  ngOnInit() {
      this.conversationService.getAllConversations$(this.userId).subscribe({
        next: (conversationsRaw: any) => {

        for ( let currentConversation of conversationsRaw ) {
            let newMessages = 0;

            // check if there are new messages fron the other user
            for ( let message of currentConversation.messages ) {
                if ((message.read === false) 
                && (message.authorFirstName != this.userFirstName)
                && (message.authorLastName != this.userLastName)) {
                  newMessages++;
                }
            }

            // info for viewing
            let conversationView = {
                userId: this.userId,
                conversationId: currentConversation._id,
                otherUserFirstName: '',
                otherUserLastName: '',
                newMessages,
            };
                      
           // check who is the other user
            if ( currentConversation.user1._id == this.userId ) {
              conversationView.otherUserFirstName = currentConversation.user2.firstName;
              conversationView.otherUserLastName = currentConversation.user2.lastName;
            } else if ( currentConversation.user2._id == this.userId ) {
              conversationView.otherUserFirstName = currentConversation.user1.firstName;
              conversationView.otherUserLastName = currentConversation.user1.lastName;
            }
    
            this.conversations.push(conversationView);
        }
          // this.conversationns = conversations;
          console.log(this.conversations);
        },
        error: (error) => {
          console.log(error);
        }
      })

      //         let conversations = [];
//         for(let i = 0; i < conversationsRaw.length; i++) {
//             let conversationRaw = conversationsRaw[i];
//             let newMessages = 0;

//             for(m of conversationRaw.messages) {
//                 if (  (m.read == false) && (m.author != username )) {
//                     newMessages++;
//                 }
//                 console.log(m.author)
//             }

//             let c = {
//                 username,
//                 conversationId: conversationRaw._id,
//                 withh: '',
//                 subject: conversationRaw.subject,
//                 newMessages,
//             };
        
//             let user1Username = conversationRaw.user1.username;
//             let uder2Username = conversationRaw.user2.username;

//             if ( user1Username == username ) {
//                 c.withh = uder2Username;
//             } else if ( uder2Username == username ) {
//                 c.withh = user1Username;
//             }
    
//             conversations.push(c);
//         }


    // this.nanniesService.getNanniesAll$().subscribe({
    //   next: (nannies) => {
    //     this.nannies = nannies;
    //     console.log(nannies)
    //     this.resultsFound = this.nannies.length;
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // })


  }

}
