import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { NannyModule } from './nanny/nannies.module';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    UserModule,
    NannyModule
  ],
  providers: [AuthService, GuardService, CanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
