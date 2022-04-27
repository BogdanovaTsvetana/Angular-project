import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-nanny',
  templateUrl: './create-nanny.component.html',
  styleUrls: ['./create-nanny.component.css']
})
export class CreateNannyComponent implements OnInit {

  //@Input() pattern: string | RegExp = undefined;
  //pattern="[^https?:\/\/]"  // TODO

  constructor() { }

  ngOnInit(): void {
  }

  submitNannyRegister(nannyRegister: NgForm): void {
    console.log(nannyRegister.value);

    // this.themeService.addTheme$(newThemeForm.value).subscribe({
    //   next: (theme) => {
    //     console.log(theme);
    //     this.router.navigate(['/themes']);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // })

  }

}
