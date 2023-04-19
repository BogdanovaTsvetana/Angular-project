import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IrootState } from 'src/app/+store/reducers';
import { isNanny } from 'src/app/+store/actions';
import { NanniesService } from '../nannies.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-nanny',
  templateUrl: './create-nanny.component.html',
  styleUrls: ['./create-nanny.component.css']
})
export class CreateNannyComponent implements OnInit {

  token: string | undefined;

  constructor(
    private router: Router, 
    private nanniesService: NanniesService, 
    private authService: AuthService,
    private store: Store<IrootState>,) { }

  ngOnInit(): void {
    // this.authService.accessToken$.subscribe(t => this.token = t)
    this.token = this.authService.accessToken;
  }

  submitNannyRegister(nannyRegister: NgForm): void {

    this.nanniesService.becomeNanny$(nannyRegister.value).subscribe({
      next: (nanny) => {
        console.log(nanny);
        this.store.dispatch(isNanny());
        //this.router.navigate(['/nannies']);
        this.router.navigate(['/user/profile']);
      },
      error: (error) => {
        console.error(error.error.message);
      }
    })
  }
}
