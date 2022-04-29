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
  nanny: any | undefined;
  canLike: boolean = false;
  routeParamObs: any;

  constructor(private activatedRoute: ActivatedRoute, private nanniesService: NanniesService) { }

  ngOnInit(): void {
    
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.nannyId = param.get('nannyId'); 
    });
    
    this.nanniesService.getNannyById(this.nannyId).subscribe(nanny => {
      this.nanny = nanny;
      this.canLike = !this.nanny?.likes.includes(this.nannyId);
    });

  }

  likeHandler() {
    console.log('click')
    // if ( this.nanny?.likes.includes(this.nannyId) ) {
    //   this.nanny.likes = this.nanny?.likes.filter(u => u != this.nannyId);
    //   console.log(1)
    //   console.log(this.nanny)
    //   // TODO to POST the updated nanny
    //   this.nanniesService.editNanny(this.nannyId, this.nanny);
    //   this.canLike = true;   // to del
    // } else if ( !this.nanny?.likes.includes(this.nannyId) ){
    //   this.nanny?.likes.push(this.nannyId);
    //   console.log(2)
    //   console.log(this.nanny)
    //   this.nanniesService.editNanny(this.nannyId, this.nanny!);
    //   // TODO to POST the updated nanny
    //   this.canLike = false;   // to del
    // }
  }

  ngOnDestroy() {
    this.routeParamObs.unsubscribe();
  }

}
