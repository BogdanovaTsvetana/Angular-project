import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NanniesRoutingModule } from './nannies-routing.module';
import { DetailsNannyComponent } from './details-nanny/details-nanny.component';
import { NanniesComponent } from './nannies/nannies.component';
import { CreateNannyComponent } from './create-nanny/create-nanny.component';
import { ShareModule } from '../share/share.module';
import { EditNannyComponent } from './edit-nanny/edit-nanny.component';

@NgModule({
  declarations: [
    NanniesComponent,
    DetailsNannyComponent,
    CreateNannyComponent,
    EditNannyComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NanniesRoutingModule,
    ShareModule
  ],
})
export class NannyModule { }
