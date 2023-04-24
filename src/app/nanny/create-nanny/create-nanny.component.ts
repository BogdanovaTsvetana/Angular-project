import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IrootState } from 'src/app/+store/reducers';
import { becomeNanny } from 'src/app/+store/actions';
import { NanniesService } from '../nannies.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-nanny',
  templateUrl: './create-nanny.component.html',
  styleUrls: ['./create-nanny.component.css']
})
export class CreateNannyComponent implements OnInit {

  token: string | undefined;
  createNannyForm: FormGroup;

  constructor(
    private router: Router, 
    private nanniesService: NanniesService, 
    private authService: AuthService,
    private store: Store<IrootState>,) { }

  ngOnInit(): void {
    // this.authService.accessToken$.subscribe(t => this.token = t)
    this.token = this.authService.accessToken;

    this.createNannyForm = new FormGroup({
      description: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      workingTime: new FormControl(null, Validators.required),
      drivingLicence: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      image: new FormControl(null, [Validators.required, this.validURL]),
      phone: new FormControl(null),
    })

    console.log(this.createNannyForm)
  }

  validURL(control: FormControl){
    const reg = /^https?:\/\//;
    if ( reg.test(control.value) == false && control.value != null) {
      return { notValidURL: true };
    }
    return null;
  }

  createNanny(): void {
    console.log(this.createNannyForm.value)
    console.log(this.createNannyForm)

    this.nanniesService.becomeNanny$(this.createNannyForm.value).subscribe({
      next: (nanny) => {
        // console.log(nanny);
        this.store.dispatch(becomeNanny());
        this.router.navigate(['/nannies/editnanny', nanny._id]);
      },
      error: (error) => {
        console.error(error.error.message);
      }
    })
  }

  // submitNannyRegister(nannyRegister: NgForm): void {
  //   console.log(nannyRegister.value)

  //   this.nanniesService.becomeNanny$(nannyRegister.value).subscribe({
  //     next: (nanny) => {
  //       console.log(nanny);
  //       this.store.dispatch(becomeNanny());
  //       this.router.navigate(['/nannies/editnanny', nanny._id]);
  //     },
  //     error: (error) => {
  //       console.error(error.error.message);
  //     }
  //   })
  // }
}
