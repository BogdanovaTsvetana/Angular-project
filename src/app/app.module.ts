import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NanniesComponent } from './nanny/nannies/nannies.component';
import { DetailsNannyComponent } from './nanny/details-nanny/details-nanny.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserModule } from './user/user.module';
import { NannyModule } from './nanny/nannies.module';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NanniesComponent,
    DetailsNannyComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    NannyModule
  ],
  providers: [AuthService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
