import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = this.authService.isAuthenticated();
  isClient: boolean = this.authService.isClient();
  isNanny: boolean = this.authService.isNanny();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
