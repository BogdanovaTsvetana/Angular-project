// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import { Observable, Subscription } from 'rxjs';
// import { MessageBusService } from 'src/app/core/message-bus.service';
// import { NanniesService } from 'src/app/nanny/nannies.service';
// import { INanny } from 'src/app/share/interfaces/nanny';
// import { ConversationsService } from '../conversations.service';
// import { AuthService } from 'src/app/auth.service';
// import { ICurrentUser } from 'src/app/share/interfaces/user';

// @Component({
//   selector: 'app-send-message',
//   templateUrl: './send-message.component.html',
//   styleUrls: ['./send-message.component.css']
// })
// export class SendMessageComponent implements OnInit, OnDestroy {
//   currentUser: ICurrentUser;
//   userId: string | undefined;
//   receiverId: string | undefined;
//   currentNanny$: Observable<INanny> = this.nanniesService.currentNanny$;
//   nannyId: string | undefined;
//   routeParamSubs: Subscription;

//   constructor( 
//       private conversationsService: ConversationsService,
//       private activatedRoute: ActivatedRoute,
//       private router: Router,
//       private messageBusService: MessageBusService,
//       private nanniesService: NanniesService,
//       private authService: AuthService
//       ) { }

//   ngOnInit(): void {
//     this.authService.currentUser$.subscribe(u => {
//       this.currentUser = u;
//     })

//     this.routeParamSubs = this.activatedRoute.paramMap.subscribe(param => {
//       this.userId = param.get('userId');
//       this.receiverId = param.get('receiverId'); 
//     });

//     this.currentNanny$.subscribe(n => {
//       this.nannyId = n._id;
//     })

//     this.authService.currentUser$.subscribe(u => {
//       this.currentUser = u;
//     })

//     // this.currentUser = this.authService.currentUser;
    
//   }

//   sendMessageHandler(sendMessage: NgForm): void {
//     this.conversationsService.createConversation$(this.currentUser._id, this.receiverId, sendMessage.value).subscribe({
//         next: (conversation) => {
//           console.log(conversation)   
//           this.router.navigate(['/nannies', this.nannyId]);
//           this.messageBusService.notifyForMessage({text: 'Message sent.', type: 'success'})
//         },
//         error: (error) => {
//           console.error(error.error.message);
//         }
//     });
//   }

//   // sendMessageHandler(sendMessage: NgForm): void {
//   //   this.conversationsService.createConversation$(this.userId, this.receiverId, sendMessage.value).subscribe({
//   //       next: (conversation) => {
//   //         console.log(conversation)   
//   //         this.router.navigate(['/nannies', this.nannyId]);
//   //         this.messageBusService.notifyForMessage({text: 'Message sent.', type: 'success'})
//   //       },
//   //       error: (error) => {
//   //         console.error(error.error.message);
//   //       }
//   //   });
//   // }

//   ngOnDestroy(): void {
//     this.routeParamSubs.unsubscribe();
//   }
// }
