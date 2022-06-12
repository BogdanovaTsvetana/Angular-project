import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';
import { Router } from '@angular/router';

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
