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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [Validators.required, this.passwordMatch(this.passwordControl)]),
    }),
  })

  passwordMatch(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return { notMatched: true }
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
    
    const { firstName, lastName, email, passwords } = this.registerFormGroup.value;

    const userData: {firstName: string, lastName: string, email: string, password: string} = { 
      firstName: firstName, 
      lastName: lastName, 
      email: email,
      password: passwords.password,
    }

    this.authService.register$(userData).subscribe({
      next: () => {
        this.router.navigate(['nannies']);
      },
      complete: () => {
        console.log('register completed')
      },
      error: (err) => {
        console.error(err);
      }
    });
    
  }

}
