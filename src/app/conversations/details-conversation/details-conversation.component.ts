import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-details-conversation',
  templateUrl: './details-conversation.component.html',
  styleUrls: ['./details-conversation.component.css']
})
export class DetailsConversationComponent implements OnInit {

  userId: any | undefined;
  conversationId: any | undefined;
  routeParamObs: any;    // TODO

  get userFirstName() {
    return this.authService.userFirstName;
  }

  get userLastName() {
    return this.authService.userLastName;
  }

  otherUserFirstName: string | undefined;
  otherUserLastName: string | undefined;
  messages: any;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private conversationService: ConversationsService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.userId = param.get('userId'); 
      this.conversationId = param.get('conversationId');
    });

    this.conversationService.getConversation$(this.userId, this.conversationId).subscribe({
      next: (conversation: any) => {
          this.messages = conversation.messages;
  
           // check who is the other user
           if ( conversation.user1._id == this.userId ) {
              this.otherUserFirstName = conversation.user2.firstName;
              this.otherUserLastName = conversation.user2.lastName;
          } else if ( conversation.user2._id == this.userId ) {
              this.otherUserFirstName = conversation.user1.firstName;
              this.otherUserLastName = conversation.user1.lastName;
          }          
              
        console.log(conversation);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }


  sendMessageHandler(sendMessage: NgForm): void {
    console.log(sendMessage.value)
    // const messageData = {
    //   author: 'username',
    //   message: sendMessage.value,
    // }

    // const conversationData = {
    //   user1: string | object;
    //   user2: string | object;
    //   //subject: string ,
    //   messages: messageData;
    // }

  //   const { firstName, lastName, email, passwords } = this.registerFormGroup.value;

  //   const userData: {firstName: string, lastName: string, email: string, password: string} = { 
  //     firstName: firstName, 
  //     lastName: lastName, 
  //     email: email,
  //     password: passwords.password,
  //   }

  //   let messageData = {
  //     author: user.username,
  //     message,
  // }

    const messageData: { authorFirstName: string, authorLastName: string, message: string } = {
      authorFirstName: this.userFirstName,
      authorLastName: this.userLastName,
      message: sendMessage.value.message,
    }

    console.log(messageData)

    this.conversationService.sendMessage$(this.userId, this.conversationId, messageData).subscribe({
        next: (message) => {
          console.log('message from server')
          console.log(message)   //TODO  notification 'Message sent'
          //this.router.navigate(['/nannies']);
        },
        error: (error) => {
          console.error(error);
        }
    });
  }



}
