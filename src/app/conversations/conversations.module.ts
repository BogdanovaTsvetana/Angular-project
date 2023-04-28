import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationsRoutingModule } from './conversations-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { DetailsConversationComponent } from './details-conversation/details-conversation.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    InboxComponent,
    DetailsConversationComponent,
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    FormsModule,
    ShareModule
  ]
})
export class ConversationsModule { }
