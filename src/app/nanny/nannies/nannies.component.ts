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

  nannies: INanny[] | undefined;

  selectedDrivingLicence: string = 'no';
  selectedGender: string = 'female';

  constructor(private nanniesService: NanniesService, private router: Router) { }

  ngOnInit(): void {
    this.nannies = this.nanniesService.nannies;
  }

  selectDrivingLicenceChangeHandler(event: any){
    this.selectedDrivingLicence = event.target.value;
    console.log(this.selectedDrivingLicence)
  }

  selectGenderHandler(event: any){
    this.selectedGender = event.target.value;
    console.log(this.selectedGender)
  }

  searchHandler(){
    console.log(this.selectedDrivingLicence + this.selectedGender)
  }

}
