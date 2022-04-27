import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ICanDeactivateComponent } from 'src/app/can-deactivate-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup: FormGroup = this.formBuilder.group({
    //username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    console.log('in login.comp: ' + this.authService.loggedIn)  // TODO
  }

  submitHandler(): void {
   
    const { email, password } = this.loginFormGroup.value;

    const userData: {email: string, password: string} = { 
      email: email,
      password: password,
    }

    console.log(userData)
    
  }

  // canExit(){
  //   if( ( !this.username || !this.password ) && this.errors.length == 0) {
  //     console.log(this.username + this.password + this.errors.length)
  //     return confirm('You have not logged in.\nDo you want to continue without logging in? ');
  //   } else {
  //     return true;
  //   }
  // }

}
