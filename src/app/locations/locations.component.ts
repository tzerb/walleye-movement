import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.css"]
})
export class LocationsComponent implements OnInit {
  constructor(private fishService: FishDataService) {}
  locations = [];
  ngOnInit() {
    this.locations = this.fishService.getLocations();
  }
}
