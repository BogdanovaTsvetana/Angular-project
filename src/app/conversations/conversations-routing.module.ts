import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DetailsConversationComponent } from './details-conversation/details-conversation.component';
import { InboxComponent } from './inbox/inbox.component';


const routes: Routes = [
    {
        path: 'conversations',
        children: [
            {
                path: 'inbox',
                canActivate: [GuardService],    
                component: InboxComponent   
            },
            {
                path: ':userId/:conversationId',
                canActivate: [GuardService],    
                component: DetailsConversationComponent
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
export class ConversationsRoutingModule { }