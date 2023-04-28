import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INanny } from 'src/app/share/interfaces/nanny';
import { NanniesService } from '../nannies.service';

@Component({
  selector: 'app-nannies',
  templateUrl: './nannies.component.html',
  styleUrls: ['./nannies.component.css']
})
export class NanniesComponent implements OnInit, OnDestroy {

  nannies: INanny[] | undefined;
  nannySubscription: Subscription | undefined;

  selectedWorkingTime: string = ''
  selectedDrivingLicence: string = '';
  selectedGender: string = '';
  resultsFound: number = 0;

  constructor(private nanniesService: NanniesService, private router: Router) { }

  ngOnInit(): void {
    this.getNannies()
  }

  selectWorkingTimeChangeHandler(event: any){
    this.selectedWorkingTime = event.target.value;
  }

  selectDrivingLicenceChangeHandler(event: any){
    this.selectedDrivingLicence = event.target.value;
  }

  selectGenderHandler(event: any){
    this.selectedGender = event.target.value;
  }

  getNannies(){
    this.nannySubscription = this.nanniesService
      .getNanniesAll$(this.selectedWorkingTime, this.selectedDrivingLicence, this.selectedGender)
      .subscribe({
      next: (nannies) => {
        this.nannies = nannies;
        this.resultsFound = this.nannies.length;
      },
      error: (err) => {
        console.error(err.error.message);
      }
    })
  }

  filterHandler(){  
    this.getNannies()
  }

  clearFilterHandler(){
    this.selectedWorkingTime = '';
    this.selectedDrivingLicence = '';
    this.selectedGender = '';
    this.getNannies()
  }

  ngOnDestroy(): void {
    if (this.nannySubscription) {
      this.nannySubscription.unsubscribe();
    }
  }

}
