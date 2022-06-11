import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  userId: any;
  receiverId: any;
  routeParamObs: any;

  constructor( 
      private conversationsService: ConversationsService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      ) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.userId = param.get('userId');
      this.receiverId = param.get('receiverId'); 
    });

    console.log(this.userId, this.receiverId)  
  }

  sendMessageHandler(sendMessage: NgForm): void {

    this.conversationsService.createConversation$(this.userId, this.receiverId, sendMessage.value).subscribe({
        next: (conversation) => {
          console.log('conv from server')
          console.log(conversation)   //TODO  notification 'Message sent'
          this.router.navigate(['/nannies']);
        },
        error: (error) => {
          console.error(error);
        }
    });
  }
}
