import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    
  }

  submitHandler(): void {

    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: () => {
        this.router.navigate(['nannies']);
      },
      complete: () => {
        console.log('login completed')
      },
      error: (err) => {
        console.error(err);
      }
    });
    
  }

}
