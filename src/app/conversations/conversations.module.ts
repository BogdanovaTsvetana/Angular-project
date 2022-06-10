import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { SendMessageComponent } from './send-message/send-message.component';
import { InboxComponent } from './inbox/inbox.component';


@NgModule({
  declarations: [
    SendMessageComponent,
    InboxComponent,
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    FormsModule,
  ]
})
export class ConversationsModule { }
