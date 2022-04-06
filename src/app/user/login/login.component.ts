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

  // username: string = '';
  // password: string = '';
  // errors: string[] = [];
  // message: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    console.log('in login.comp: ' + this.authService.loggedIn)
  }

  submitHandler(){

    console.log('form is submitted')
    console.log(this.loginFormGroup)
    console.log('username')
    console.log(this.loginFormGroup.controls['username'].errors)
    console.log('password')
    console.log(this.loginFormGroup.controls['password'].errors)


    
    //this.authService.loggedIn = true;
    // console.log('in login.comp: ' + 'this.authService.loggedIn: ' + this.authService.loggedIn);
    // console.log('in login.comp: ' + this.username + this.password);
    // console.log(this.username + this.password + this.errors.length)
    

    // if ( this.username === '') {
    //   this.errors.push('Username is required!');
    // } 

    // if ( this.password === '') {
    //   this.errors.push('Password is required!');
    // }

    // if ( this.errors.length > 0) {
    //   this.message = this.errors.join('\n');
    //   console.log('Message:')
    //   console.log(this.message)
    //   console.log('Message end')
    // } else {

      // this.authService.login(this.username, this.password)

      // this.authService.loggedIn = true;
     
      // console.log('in login.comp: ' + 'this.authService.loggedIn: ' + this.authService.loggedIn);
      // console.log('in login.comp: ' + this.username + this.password);
      // console.log(this.username + this.password + this.errors.length)
      // this.router.navigate(['nannies']);
          
    // }
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
