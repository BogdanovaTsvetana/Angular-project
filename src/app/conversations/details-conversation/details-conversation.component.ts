import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-details-conversation',
  templateUrl: './details-conversation.component.html',
  styleUrls: ['./details-conversation.component.css']
})
export class DetailsConversationComponent implements OnInit {

  // userId: any | undefined;
  
  
  user: any | undefined;
  routeParamObs: any;    // TODO
  conversationId: any | undefined;

  // get userFirstName() {
  //   return this.authService.userFirstName;
  // }

  // get userLastName() {
  //   return this.authService.userLastName;
  // }

  otherUserFirstName: string | undefined;
  otherUserLastName: string | undefined;
  messages: any;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private conversationService: ConversationsService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(u => this.user = u)
    console.log('user')
    console.log(this.user)
    
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.conversationId = param.get('conversationId');
    });

    this.conversationService.getConversation$(this.user._id, this.conversationId).subscribe({
      next: (conversation: any) => {
          this.messages = conversation.messages;
  
           // check who is the other user
           if ( conversation.user1._id == this.user._id ) {
              this.otherUserFirstName = conversation.user2.firstName;
              this.otherUserLastName = conversation.user2.lastName;
          } else if ( conversation.user2._id == this.user._id ) {
              this.otherUserFirstName = conversation.user1.firstName;
              this.otherUserLastName = conversation.user1.lastName;
          }          
              
        console.log(conversation);
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
          this.router.navigate(['/conversations/inbox']);
        },
        error: (error) => {
          console.error(error.error.message);
        }
      });
  }



}
