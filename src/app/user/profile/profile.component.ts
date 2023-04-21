import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ICurrentUser, IUser } from '../../share/interfaces/user';
import { INanny } from '../../share/interfaces/nanny';
import { AuthService } from '../../auth.service';
import { NanniesService } from '../../nanny/nannies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: IUser = undefined;
  nanny: any;
 
  get userId() {
    return this.authService.userId;
  }

  isInEditMode: boolean = false;

  updateProfileFormGroup: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private nanniesService: NanniesService, 
    private router: Router) { }

  ngOnInit(): void {
      this.authService.getProfile$(this.userId).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.nanny = user.nanny;
        console.log(this.nanny)
        // this.nannyId = user.nanny._id;
      },
      error: () => {
        this.router.navigate(['/user/login'])
      }
    })
  }
  
  updateProfile() {
    // console.log(this.updateProfileFormGroup.value);

    this.authService.updateProfile$(this.userId, this.updateProfileFormGroup.value).subscribe({
      next: (user) => {
        console.log('user')
        console.log(user)
        this.currentUser = user;
        this.authService.handleUpdateUser(user)
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
        // this.authService.newUser.userType='parent';  // TODO
        this.router.navigate(['/nannies']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  enterEditMode(): void {
    this.isInEditMode = true;
    this.updateProfileFormGroup.patchValue({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
    });
  }

  // updateNanny(editProfileForm: NgForm) {
  //   console.log(editProfileForm.value);

  //   this.nanniesService.editNanny$(this.nanny._id, editProfileForm.value).subscribe({
  //     next: (nanny) => {
  //       console.log(nanny)
  //       //this.router.navigate(['/nannies']);
  //       this.router.navigate(['/user/profile']);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   })
  // }

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
