import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NanniesRoutingModule } from './nannies-routing.module';
import { DetailsNannyComponent } from './details-nanny/details-nanny.component';
import { NanniesComponent } from './nannies/nannies.component';
import { CreateNannyComponent } from './create-nanny/create-nanny.component';



@NgModule({
  declarations: [
    NanniesComponent,
    DetailsNannyComponent,
    CreateNannyComponent,

  ],
  imports: [
    CommonModule,
    NanniesRoutingModule
  ],
})
export class NannyModule { }
