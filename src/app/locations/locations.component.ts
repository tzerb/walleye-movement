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
  markerArray = [];

  lat: number = 44.2;
  lng: number = -89.0;
  zoom: number = 9;

  ngOnInit() {
    this.locations = this.fishService.getLocations();
    this.locations.forEach(l =>
      this.markerArray.push({
        label: l.Id + ":" + l.Name,
        lat: l.Lat,
        lng: l.Lng,
        weight: 1,
        radius: 2000,
        options: {}
      })
    );
  }
}
