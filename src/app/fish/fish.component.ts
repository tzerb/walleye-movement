import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-fish",
  templateUrl: "./fish.component.html",
  styleUrls: ["./fish.component.css"]
})
export class FishComponent implements OnInit {
  constructor(private fishService: FishDataService) {}

  fish = [];
  locations = [];
  ngOnInit() {
    this.fish = this.fishService.getFish();
    this.locations = this.fishService.getLocations();
    this.fishService.runTest();
  }
  getLocationText(f) {
    if (f.Contacts.length > 0) {
      var loc = this.locations.find(l => l.Id == f.Contacts[0].LocationId);
      return loc ? loc.Name : "--";
    }
    return "--";
  }
}
