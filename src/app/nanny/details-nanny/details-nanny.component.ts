import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';
import { mergeMap, tap, map, Subscription, combineLatest } from 'rxjs';
import { ICurrentUser } from 'src/app/share/interfaces/user';
import { Store } from '@ngrx/store';
import { IrootState } from 'src/app/+store/reducers';
import { becomeNanny } from 'src/app/+store/actions';
import { MessageBusService } from 'src/app/core/message-bus.service';


@Component({
  selector: 'app-details-nanny',
  templateUrl: './details-nanny.component.html',
  styleUrls: ['./details-nanny.component.css']
})
export class DetailsNannyComponent implements OnInit, OnDestroy {
  // nannyId: any | undefined;

  currentUser: ICurrentUser;
  nanny: any | undefined;
  canLike: boolean = false;
  nannySubscription: Subscription;

  @ViewChild('sendMessageForm') sendMessageForm: NgForm;
  @ViewChild('createCommentForm') createCommentForm: NgForm;
  

  // get userId() {
  //   return this.authService.userId;
  // }

  // get userFirstName() {
  //   return this.authService.userFirstName;
  // }

  // get userLastName() {
  //   return this.authService.userLastName;
  // }

  constructor(
      private activatedRoute: ActivatedRoute, 
      private nanniesService: NanniesService, 
      private authService: AuthService, 
      private messageBusService: MessageBusService,
      private store: Store<IrootState>,
      private router: Router) { }

  ngOnInit(): void {
    //  OLD variant
    // this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
    //   this.nannyId = param.get('nannyId'); 
    // });
    
    // this.nanniesService.getNannyById$(this.nannyId).subscribe({
    //   next: (nanny) => {
    //     this.nanny = nanny;
    //     this.canLike = !this.nanny?.likes.includes(this.userId);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // });

    // this.routeParamObs = this.activatedRoute.params.pipe(
    //   map(p => p['nannyId']),
    //   mergeMap(nannyId => this.nanniesService.getNannyById$(nannyId)).subscribe({
    //     next: (nanny) => {
    //           this.nanny = nanny;
    //           this.canLike = !this.nanny?.likes.includes(this.userId);
    //         },
    //         error: (error) => {
    //           console.error(error);
    //         }
    //   })
    // )

    combineLatest([
      this.activatedRoute.params.pipe(
        mergeMap( params => {
            const nannyId = params['nannyId'];
            return this.nanniesService.getNannyById$(nannyId)
        })),
      this.authService.currentUser$  
    ]) 
      .subscribe({
        next: ([nanny, currentUser]) => {
          this.nanny = nanny;
          this.currentUser = currentUser;
          this.canLike = currentUser && !this.nanny?.likes.includes(currentUser._id);
          console.log(this.nanny)
          console.log('nanny ID ' + this.nanny?._id)
          console.log('user ID ' + this.currentUser?._id)
        },
        error: (err) => {
          console.error(err.error.message);
        }
      })
        
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(params => {
  //     const themeId = params['themeId'];
  //     this.themeService.loadThemeById(themeId).subscribe(theme => {
  //       this.theme = theme;
  //       this.canSubscribe = !this.theme.subscribers.includes('5fa64b162183ce1728ff371d');
  //     });
  //   })
  // }

  sendMessageHandler(): void {
    console.log(this.createCommentForm.value)
    this.nanniesService.createConversation$(this.currentUser._id, this.nanny.user, this.sendMessageForm.value).subscribe({
        next: (conversation) => {
          console.log(conversation)   
          this.router.navigate(['/nannies', this.nanny._id]);
          this.sendMessageForm.reset();
          this.messageBusService.notifyForMessage({text: 'Message sent.', type: 'success'})
        },
        error: (error) => {
          console.error(error.error.message);
        }
    });
  }

  createCommentHandler(): void {   // TODO 
    console.log(this.createCommentForm.value)
   
    const commentData: { author: string, content: string } = {
      //author: this.userId,
      author: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      content: this.createCommentForm.value.comment,
    }

    this.nanniesService.createComment$(this.nanny._id, commentData).subscribe({
      next: (nannyUpdated) => {
        console.log('nannyUpdated from server')
        console.log(nannyUpdated)   //TODO  notification 'Comment sent'
        this.nanny = nannyUpdated;
        this.createCommentForm.reset();
      },
      error: (err) => {
        console.error(err.error.message);
      }
  });
  }

  likeHandler() {     
    if ( !this.nanny?.likes.includes(this.currentUser._id) ){
      this.nanniesService.likeNanny$(this.nanny._id).subscribe({
        next: (nannyUpdated) => {
          this.nanny = nannyUpdated; 
          this.canLike = false; 
        },
        error: (err) => {
          console.error(err.error.message);
        }
      })
    }

    if ( this.nanny?.likes.includes(this.currentUser._id) ){
      this.nanniesService.unlikeNanny$(this.nanny._id).subscribe({
        next: (nannyUpdated) => {
          this.nanny = nannyUpdated; 
          this.canLike = true; 
        },
        error: (err) => {
          console.error(err.error.message);
        }
      })
    }

  }



  ngOnDestroy() {
    // this.nannySubscription.unsubscribe();
  }

}
