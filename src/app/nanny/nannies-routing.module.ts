import { RouterModule, Routes } from '@angular/router';
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
                component: DetailsNannyComponent
            }
            
        ]
    }
]

export const NanniesRoutingModule = RouterModule.forChild(routes);