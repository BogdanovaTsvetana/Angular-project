import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuardService } from '../can-deactivate-guard.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { GuardService } from '../guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { InboxComponent } from '../conversations/inbox/inbox.component';

const routes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'profile',
                canActivate: [GuardService],
                component: ProfileComponent
            },
            {
                path: 'inbox',
                canActivate: [GuardService],
                component: InboxComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            }
    ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule { }