import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { NannyModule } from './nanny/nannies.module';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SendMessageComponent } from './conversations/send-message/send-message.component';
import { InboxComponent } from './conversations/inbox/inbox.component';
import { ConversationsModule } from './conversations/conversations.module';
import { ShareModule } from './share/share.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
  
    UserModule,
    NannyModule,
    ConversationsModule,
  ],
  providers: [AuthService, GuardService, CanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
