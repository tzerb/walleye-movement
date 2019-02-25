/* Angular imports */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSliderModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatInputModule,
  MatBadgeModule,
  MatMenuModule
} from "@angular/material";

/* third party imports */
import { ChartsModule } from "ng2-charts";
import { AgmCoreModule } from "@agm/core";

/* custom components */
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FishComponent } from "./fish/fish.component";
import { LocationsComponent } from "./locations/locations.component";
import { SingleFishComponent } from "./single-fish/single-fish.component";
import { MovementMapComponent } from "./movement-map/movement-map.component";
import { GoogleApiKey } from "./sensitive";
import { IndexComponent } from "./index/index.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ContactsByHourComponent } from "./contacts-by-hour/contacts-by-hour.component";
import { ContactsByDayComponent } from "./contacts-by-day/contacts-by-day.component";
import { ContactsPerReceiverComponent } from "./contacts-per-receiver/contacts-per-receiver.component";
import { ContactsPerFishComponent } from "./contacts-per-fish/contacts-per-fish.component";
import { ContactsMissedByReceiverComponent } from "./contacts-missed-by-receiver/contacts-missed-by-receiver.component";

@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    LocationsComponent,
    SingleFishComponent,
    MovementMapComponent,
    IndexComponent,
    ToolbarComponent,
    ContactsByHourComponent,
    ContactsByDayComponent,
    ContactsPerReceiverComponent,
    ContactsPerFishComponent,
    ContactsMissedByReceiverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: GoogleApiKey
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
