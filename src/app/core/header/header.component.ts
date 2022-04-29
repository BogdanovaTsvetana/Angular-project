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
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  currentUser$: Observable<any> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  
  get isParent(): boolean {
    return this.authService.isParent;
  }

  get token() {
    return this.authService.accessToken;
  }

  get isNanny(): boolean {
    return this.authService.isNanny;
  }

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
