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

  nannyId: number | undefined;
  nanny: INanny | undefined;
  routeParamObs: any;

  constructor(private activatedRoute: ActivatedRoute, private nanniesService: NanniesService) { }

  ngOnInit(): void {
    this.routeParamObs = this.activatedRoute.paramMap.subscribe(param => {
      this.nannyId = Number(param.get('nannyId')); 
    });
    
    this.nanny = this.nanniesService.getNannyDetails(this.nannyId!)
  }

  ngOnDestroy() {
    this.routeParamObs.unsubscribe();
  }

}
