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

  conversationns: any;

  constructor( 
      private conversationService: ConversationsService,
      private authService: AuthService,
      ) { }

  ngOnInit(): void {
      this.conversationService.getAllConversations$(this.userId).subscribe({
        next: (conversations) => {
          this.conversationns = conversations;
          console.log(conversations);
        },
        error: (error) => {
          console.log(error);
        }
      })


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
