import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private conversationService: ConversationsService,
    ) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.userId = param.get('userId'); 
      this.conversationId = param.get('conversationId');
    });

    this.conversationService.getConversation$(this.userId, this.conversationId).subscribe({
      next: (conversation) => {

     
        console.log(conversation);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}
