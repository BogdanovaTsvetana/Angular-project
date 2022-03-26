import { Component, OnInit } from '@angular/core';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';

@Component({
  selector: 'app-details-nanny',
  templateUrl: './details-nanny.component.html',
  styleUrls: ['./details-nanny.component.css']
})
export class DetailsNannyComponent implements OnInit {

  nanny: INanny | undefined;

  constructor(private nanniesService: NanniesService) { }

  ngOnInit(): void {
    
  }

}
