import { Component, OnInit } from '@angular/core';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';

@Component({
  selector: 'app-nannies',
  templateUrl: './nannies.component.html',
  styleUrls: ['./nannies.component.css']
})
export class NanniesComponent implements OnInit {

  nannies: INanny[] | undefined;

  constructor(private nanniesService: NanniesService) { }

  ngOnInit(): void {
    this.nannies = this.nanniesService.nannies;
    console.log(this.nannies)
  }

}
