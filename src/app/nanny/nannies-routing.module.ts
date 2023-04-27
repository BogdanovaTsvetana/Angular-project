import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { CreateNannyComponent } from './create-nanny/create-nanny.component';
import { DetailsNannyComponent } from './details-nanny/details-nanny.component';
import { ProfileNannyComponent } from './profile-nanny/profile-nanny.component';
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
                path: 'nannyregister',
                //canActivate: [GuardService],    // TODO guard
                component: CreateNannyComponent,   // TODO guard
            },
            // {
            //     path: 'profile/:nannyId',
            //     component: DetailsNannyComponent,
            // },
            {
                path: ':nannyId',
                canActivate: [GuardService],
                component: DetailsNannyComponent,   
            },
            {
                path: 'profilenanny/:nannyId',
                canActivate: [GuardService],
                component: ProfileNannyComponent,   
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
            
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NanniesRoutingModule { }