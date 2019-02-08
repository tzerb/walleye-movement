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
  ngOnInit() {
    this.fish = this.fishService.getFish();
  }
}
