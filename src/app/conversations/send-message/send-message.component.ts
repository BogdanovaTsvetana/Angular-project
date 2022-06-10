import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  constructor( private conversationsService: ConversationsService ) { }

  ngOnInit(): void {
  }

  sendMessageHandler(sendMessage: NgForm): void {

    // this.nanniesService.becomeNanny$(sendMessage.value).subscribe({
    //   next: (nanny) => {
    //     console.log(nanny);
    //     this.authService.newUser.userType='nanny';  // TODO
    //     //this.router.navigate(['/nannies']);
    //     this.router.navigate(['/user/profile']);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // })

    console.log('send-message')
    console.log(sendMessage.value)

    //this.conversationsService.createConversation(sendMessage.value)

    this.conversationsService.createConversation$(sendMessage.value).subscribe({
        next: (conversation) => {
          console.log('conv from server')
          console.log(conversation)
        },
        error: (error) => {
          console.error(error);
        }
    });
 
  }

}
