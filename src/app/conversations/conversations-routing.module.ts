import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { InboxComponent } from './inbox/inbox.component';
import { SendMessageComponent } from './send-message/send-message.component';


const routes: Routes = [
   
            {
                path: 'conversations/send-message',
                canActivate: [GuardService],    // TODO guard
                component: SendMessageComponent,
            },
            {
                path: 'inbox',
                //canActivate: [GuardService],    // TODO guard
                component: InboxComponent   // TODO guard
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
            
     
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule { }