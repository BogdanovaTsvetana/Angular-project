import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../guard.service';
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
                path: ':nannyId',
                component: DetailsNannyComponent,
                canActivate: [GuardService]
            }
            
        ]
    }
]

export const NanniesRoutingModule = RouterModule.forChild(routes);