import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';

@Component({
  selector: 'app-nannies',
  templateUrl: './nannies.component.html',
  styleUrls: ['./nannies.component.css']
})
export class NanniesComponent implements OnInit {

  // nannies: INanny[] | undefined;
  nannies: any;   // TODO

  selectWorkingTime: string = ''
  selectedDrivingLicence: string = '';
  selectedGender: string = '';

  resultsFound: number = 0;

  constructor(private nanniesService: NanniesService, private router: Router) { }

  ngOnInit(): void {
  
    this.nanniesService.getNanniesAll$().subscribe({
      next: (nannies) => {
        this.nannies = nannies;
        console.log(nannies)
        this.resultsFound = this.nannies.length;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  selectWorkingTimeChangeHandler(event: any){
    this.selectWorkingTime = event.target.value;
    console.log(this.selectWorkingTime)
  }

  selectDrivingLicenceChangeHandler(event: any){
    this.selectedDrivingLicence = event.target.value;
    console.log(this.selectedDrivingLicence)
  }

  selectGenderHandler(event: any){
    this.selectedGender = event.target.value;
    console.log(this.selectedGender)
  }

  searchHandler(){  // TODO
   
  }

}
