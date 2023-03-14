import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';


@Component({
  selector: 'app-details-nanny',
  templateUrl: './details-nanny.component.html',
  styleUrls: ['./details-nanny.component.css']
})
export class DetailsNannyComponent implements OnInit, OnDestroy {


  nannyId: any | undefined;
  nanny: any | undefined;
  canLike: boolean = false;
  routeParamObs: any;

  get userId() {
    return this.authService.userId;
  }

  get userFirstName() {
    return this.authService.userFirstName;
  }

  get userLastName() {
    return this.authService.userLastName;
  }

  constructor(
      private activatedRoute: ActivatedRoute, 
      private nanniesService: NanniesService, 
      private authService: AuthService, 
      private router: Router) { }

  ngOnInit(): void {
    
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.nannyId = param.get('nannyId'); 
    });
    
    this.nanniesService.getNannyById$(this.nannyId).subscribe({
      next: (nanny) => {
        this.nanny = nanny;
        this.canLike = !this.nanny?.likes.includes(this.userId);
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  createCommentHandler(createComment: NgForm): void {   // TODO 
   
    const commentData: { author: string, content: string } = {
      //author: this.userId,
      author: this.userFirstName + ' ' + this.userLastName,
      content: createComment.value.comment,
    }

    this.nanniesService.createComment$(this.nannyId, commentData).subscribe({
      next: (nannyUpdated) => {
        console.log('nannyUpdated from server')
        console.log(nannyUpdated)   //TODO  notification 'Comment sent'
        this.nanny = nannyUpdated;
      },
      error: (error) => {
        console.error(error);
      }
  });
  }

  likeHandler() {     // TODO
    console.log('click')
   

    // if ( !this.nanny?.likes.includes(this.userId) ){
    //   this.nanny?.likes.push(this.userId);
    //   console.log(2)
    //   console.log(this.nanny)
    //   this.nanniesService.editNanny$(this.nanny._id, this.nanny).subscribe({
    //     next: (nanny) => {
    //       console.log(nanny)
          
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     }
    //   })
    // }

      this.canLike = false;   // to del
  }

  ngOnDestroy() {
    this.routeParamObs.unsubscribe();
  }

}
