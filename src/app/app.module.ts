import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import {
  MatCardModule,
  MatSliderModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatInputModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { FishComponent } from "./fish/fish.component";
import { LocationsComponent } from "./locations/locations.component";
import { SingleFishComponent } from "./single-fish/single-fish.component";
import { MovementMapComponent } from "./movement-map/movement-map.component";
import { GoogleApiKey } from "./sensitive";
import { IndexComponent } from "./index/index.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    LocationsComponent,
    SingleFishComponent,
    MovementMapComponent,
    IndexComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: GoogleApiKey
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
