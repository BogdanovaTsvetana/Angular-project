import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { mergeMap, combineLatest } from 'rxjs';
import { ICurrentUser } from 'src/app/share/interfaces/user';
import { AuthService } from 'src/app/auth.service';
import { NanniesService } from '../nannies.service';
import { MessageBusService } from 'src/app/core/message-bus.service';

@Component({
  selector: 'app-details-nanny',
  templateUrl: './details-nanny.component.html',
  styleUrls: ['./details-nanny.component.css']
})
export class DetailsNannyComponent implements OnInit {

  currentUser: ICurrentUser;
  nanny: any;
  canLike: boolean = false;

  @ViewChild('sendMessageForm') sendMessageForm: NgForm;
  @ViewChild('createCommentForm') createCommentForm: NgForm;

  constructor(
      private activatedRoute: ActivatedRoute, 
      private nanniesService: NanniesService, 
      private authService: AuthService, 
      private messageBusService: MessageBusService,
      private router: Router) { }

  ngOnInit(): void {

    combineLatest([
      this.activatedRoute.params.pipe(
        mergeMap( params => {
            const nannyId = params['nannyId'];
            return this.nanniesService.getNannyById$(nannyId);
        })),
      this.authService.currentUser$  
    ]) 
      .subscribe({
        next: ([nanny, currentUser]) => {
          this.nanny = nanny;
          this.currentUser = currentUser;
          this.canLike = currentUser && !this.nanny?.likes.includes(currentUser._id);
        },
        error: (err) => {
          console.error(err.error.message);
        }
      })
  }

  sendMessageHandler(): void {
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

  createCommentHandler(): void {    
    const commentData: { author: string, content: string } = {
      author: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      content: this.createCommentForm.value.comment,
    }

    this.nanniesService.createComment$(this.nanny._id, commentData).subscribe({
      next: (nannyUpdated) => {
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
}
