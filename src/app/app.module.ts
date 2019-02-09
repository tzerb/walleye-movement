import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FishComponent } from './fish/fish.component';
import { LocationsComponent } from './locations/locations.component';
import { SingleFishComponent } from './single-fish/single-fish.component';

@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    LocationsComponent,
    SingleFishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
