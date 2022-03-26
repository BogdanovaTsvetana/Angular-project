import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NanniesComponent } from './nanny/nannies/nannies.component';
import { DetailsNannyComponent } from './nanny/details-nanny/details-nanny.component';

@NgModule({
  declarations: [
    AppComponent,
    NanniesComponent,
    DetailsNannyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
