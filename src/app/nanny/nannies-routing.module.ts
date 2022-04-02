import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../guard.service';
import { CreateNannyComponent } from './create-nanny/create-nanny.component';
import { DetailsNannyComponent } from './details-nanny/details-nanny.component';
import { NanniesComponent } from './nannies/nannies.component';

const routes: Routes = [
    {
        path: 'nannies',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: NanniesComponent
            },
            {
                path: 'create',
                component: CreateNannyComponent,   // TODO guard
            },
            {
                path: ':nannyId',
                component: DetailsNannyComponent,
                canActivate: [GuardService]
            }
            
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NanniesRoutingModule { }