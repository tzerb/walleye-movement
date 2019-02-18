import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FishComponent } from "./fish/fish.component";
import { SingleFishComponent } from "./single-fish/single-fish.component";
import { LocationsComponent } from "./locations/locations.component";
import { MovementMapComponent } from "./movement-map/movement-map.component";
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  { path: "fish", component: FishComponent },
  { path: "singlefish/:fishId", component: SingleFishComponent },
  { path: "locations", component: LocationsComponent },
  { path: "movement", component: MovementMapComponent },
  { path: "**", component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
