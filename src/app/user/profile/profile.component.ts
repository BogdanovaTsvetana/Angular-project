import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../share/interfaces/user';
import { INanny } from '../../share/interfaces/nanny';
import { AuthService } from '../../auth.service';
import { NanniesService } from '../../nanny/nannies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  nanny: any;

  get userId() {
    return this.authService.userId;
  }

  isInEditMode: boolean = false;

  constructor(private authService: AuthService, private nanniesService: NanniesService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile$(this.userId).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.nanny = user.nanny;
      },
      error: () => {
        this.router.navigate(['/user/login'])
      }
    })
  }

  updateNanny(editProfileForm: NgForm) {
    console.log(editProfileForm.value);

    this.nanniesService.editNanny$(this.nanny._id, editProfileForm.value).subscribe({
      next: (nanny) => {
        console.log(nanny)
        //this.router.navigate(['/nannies']);
        this.router.navigate(['/user/profile']);
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
        this.authService.newUser.userType='parent';  // TODO
        this.router.navigate(['/nannies']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  enterEditMode(): void {
    this.isInEditMode = true;
  }

}
