import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';

@Component({
  selector: 'app-details-nanny',
  templateUrl: './details-nanny.component.html',
  styleUrls: ['./details-nanny.component.css']
})
export class DetailsNannyComponent implements OnInit, OnDestroy {

  nannyId: any | undefined;
  nanny: INanny | undefined;
  canLike: boolean = false;
  routeParamObs: any;

  constructor(private activatedRoute: ActivatedRoute, private nanniesService: NanniesService) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.nannyId = param.get('nannyId'); 
    });
    
    this.nanny = this.nanniesService.getNannyById(this.nannyId!);
    this.canLike = !this.nanny?.likes.includes('11');
  }

  likeHandler() {
    console.log('click')
    if ( this.nanny?.likes.includes('11') ) {
      this.nanny.likes = this.nanny?.likes.filter(u => u != '11');
      console.log(1)
      console.log(this.nanny)
      // TODO to POST the updated nanny
      this.canLike = true;   // to del
    } else if ( !this.nanny?.likes.includes('11') ){
      this.nanny?.likes.push('11');
      console.log(2)
      console.log(this.nanny)
      // TODO to POST the updated nanny
      this.canLike = false;   // to del
    }
  }

  ngOnDestroy() {
    this.routeParamObs.unsubscribe();
  }

}
