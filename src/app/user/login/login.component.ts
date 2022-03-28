import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = 'kk';
  password: string = 'kk';
  errors: string[] = [];
  message: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('in login.comp: ' + this.authService.loggedIn)
  }

  submitHandler(){
    this.authService.loggedIn = true;
      console.log('in login.comp: ' + this.authService.loggedIn)

  //   if ( this.username === '') {
  //     this.errors.push('Username is required!');
  //   } 

  //   if ( this.password === '') {
  //     this.errors.push('Password is required!');
  //   }

  //   if ( this.errors.length > 0) {
  //     this.message = this.errors.join('/n');
  //     console.log(this.message)
  //   } else {

  //     this.authService.login(this.username, this.password)

  //     this.authService.loggedIn = true;
  //     console.log('in login.comp: ' + this.authService.loggedIn)
          
  // }
  }

  

}
