import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICurrentUser, IUser } from '../../share/interfaces/user';
import { AuthService } from '../../auth.service';
import { MessageBusService } from 'src/app/core/message-bus.service';
import { INanny } from 'src/app/share/interfaces/nanny';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser = undefined;
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
    private router: Router,
    private messageBusService: MessageBusService) { }

  ngOnInit(): void {
      this.authService.getProfile$(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.nanny = user.nanny;
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
        this.user = user;
        this.authService.handleUpdateUser(user)
        this.isInEditMode = false;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteUser() {
    this.authService.deleteUser$(this.userId).subscribe({
      next: () => {
        console.log('User deleted');
        this.messageBusService.notifyForMessage({text: `Successfully deleted`, type: 'success'});
        this.authService.handleLogout();
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
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    });
  }
}
