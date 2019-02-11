import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-single-fish",
  templateUrl: "./single-fish.component.html",
  styleUrls: ["./single-fish.component.css"]
})
export class SingleFishComponent implements OnInit {
  private singlefish: any;
  constructor(
    private route: ActivatedRoute,
    private fishService: FishDataService
  ) {}

  ngOnInit() {
    const fishId = +this.route.snapshot.paramMap.get("fishId");
    this.singlefish = this.fishService.getSingleFish(fishId);
    debugger;
  }
}
