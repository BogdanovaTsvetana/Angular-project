import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { NanniesService } from '../nannies.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-nanny',
  templateUrl: './create-nanny.component.html',
  styleUrls: ['./create-nanny.component.css']
})
export class CreateNannyComponent implements OnInit {

  constructor(private router: Router, private nanniesService: NanniesService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitNannyRegister(nannyRegister: NgForm): void {

    this.nanniesService.becomeNanny$(nannyRegister.value).subscribe({
      next: (nanny) => {
        console.log(nanny);
        this.authService.newUser.userType='nanny';  // TODO
        this.router.navigate(['/nannies']);
      },
      error: (error) => {
        console.error(error);
      }
    })

  }

  

}
