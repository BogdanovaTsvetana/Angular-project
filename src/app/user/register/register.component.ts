import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(4)])
    }),
  })

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router) { }

  ngOnInit(): void {
  }

  submitHandler(): void {
    // console.log(this.registerFormGroup)
    // console.log('username')
    // console.log(this.registerFormGroup.controls['username'].errors)
    // console.log('email')
    // console.log(this.registerFormGroup.controls['email'].errors)
    // console.log(this.registerFormGroup.value)

    const { username, email, passwords } = this.registerFormGroup.value;

    const userData: {username: string, email: string, password: string, memberSince: any} = { 
      username: username, 
      email: email,
      password: passwords.password,
      memberSince: new Date(),
    }

    this.authService.register$(userData).subscribe(() => {
      this.router.navigate(['nannies'])
    });    
    
  }

}
