import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [Validators.required, this.passwordMatch(this.passwordControl)]),
    }),
  })

  passwordMatch(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
              notMatched: true
            }
        }

        return null;
    }

    return validtorFn;
  }

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router) { }

  ngOnInit(): void {
  }

  submitHandler(): void {
    
    const { username, email, passwords } = this.registerFormGroup.value;

    const userData: {username: string, email: string, password: string} = { 
      username: username, 
      email: email,
      password: passwords.password,
      //memberSince: new Date(),
    }

    console.log(userData)

    this.authService.register$(userData).subscribe(() => {
      this.router.navigate(['nannies'])
    });    
    
  }

}
