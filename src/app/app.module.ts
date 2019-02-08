import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FishComponent } from './fish/fish.component';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
