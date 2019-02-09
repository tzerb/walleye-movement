import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FishComponent } from "./fish/fish.component";
import { LocationsComponent } from "./locations/locations.component";

const routes: Routes = [
  { path: "fish", component: FishComponent },
  { path: "locations", component: LocationsComponent },
  { path: "**", component: FishComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
