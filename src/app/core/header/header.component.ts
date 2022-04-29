import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/share/interfaces/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  // isParent: boolean = this.authService.isParent;
  // isNanny: boolean = this.authService.isNanny;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    
      return this.authService.isNanny;
    
  }

  //currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser$: Observable<any> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  

  //private isLoggingOut: boolean = false;
  // get isLoggedIn(): boolean {
  //   return this.authService.isLogged;
  // }

  get isParent(): boolean {
    return this.authService.isParent;
  }

  get token() {
    return this.authService.accessToken;
  }

  get isNanny(): boolean {
    return this.authService.isNanny;
  }

  // get currentUser(): IUser {
  //   return this.userService.currentUser;
  // }

  logoutHandler(): void {

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args);
      },
      complete: () => {
        this.router.navigate(['nannies']);
      },
      error: (err) => {
        console.log(err.message);
      }
    });

  }

}
