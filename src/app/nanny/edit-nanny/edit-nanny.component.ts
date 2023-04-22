import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NanniesService } from '../nannies.service';
import { Store } from '@ngrx/store';
import { IrootState } from 'src/app/+store/reducers';
import { deleteNanny } from 'src/app/+store/actions';
import { MessageBusService } from 'src/app/core/message-bus.service';

@Component({
  selector: 'app-edit-nanny',
  templateUrl: './edit-nanny.component.html',
  styleUrls: ['./edit-nanny.component.css']
})
export class EditNannyComponent implements OnInit {

  nannyId: any;
  nanny: any;

  get userId() {
    return this.authService.userId;
  }

  isInEditMode: boolean = false;
  updateNannyForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private nanniesService: NanniesService, 
    private store: Store<IrootState>,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private messageBusService: MessageBusService) { }

  ngOnInit(): void {
    console.log('here')

    this.updateNannyForm = new FormGroup({
      description: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      workingTime: new FormControl(null),
      drivingLicence: new FormControl(null),
      gender: new FormControl(null),
      image: new FormControl(null, [Validators.required, this.validURL]),
      phone: new FormControl(null),
    })

 
    this.activatedRoute.paramMap.subscribe(param => {
        this.nannyId = param.get('nannyId');
      });

    this.nanniesService.getNannyById$(this.nannyId).subscribe({
      next: (nanny) => {
        this.nanny = nanny;
        console.log(this.nanny)
      },
      error: () => {
        this.router.navigate(['/user/login'])
      }
    })
  }

  validURL(control: FormControl){
    const reg = /^https?:\/\//;
    if ( reg.test(control.value) == false && control.value != null) {
      return { notValidURL: true };
    }
    return null;
  }

  enterEditMode(): void {
    this.isInEditMode = true;

    this.updateNannyForm.patchValue({
      description: this.nanny.description,
      workingTime: this.nanny.workingTime,
      drivingLicence: this.nanny.drivingLicence,
      gender: this.nanny.gender,
      image: this.nanny.image,
      phone: this.nanny.phone
    })
    
  }

  updateNanny() {
    console.log(this.updateNannyForm);
 
    this.nanniesService.editNanny$(this.nanny._id, this.updateNannyForm.value).subscribe({
      next: (nanny) => {
        this.nanny = nanny;
        this.isInEditMode = false;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteNanny() {
    this.nanniesService.deleteNanny$(this.nanny._id).subscribe({
      next: () => {
        console.log('Nanny deleted');
        this.store.dispatch(deleteNanny());
        this.messageBusService.notifyForMessage({text: `Successfully deleted`, type: 'success'})
        this.router.navigate(['/nannies']);
      },
      error: (error) => {
        console.error(error.error);
      }
    })
  }


  // deleteNanny() {
  //   this.nanniesService.deleteNanny$(this.nanny._id).subscribe({
  //     next: () => {
  //       console.log('Nanny deleted');
  //       // this.authService.newUser.userType='parent';  // TODO
  //       this.router.navigate(['/nannies']);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   })
  // }

}
