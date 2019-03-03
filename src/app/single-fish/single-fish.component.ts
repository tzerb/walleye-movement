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
  ) { }

  ngOnInit() {
    const fishCode: string = this.route.snapshot.paramMap.get("fishCode");
    this.singlefish = this.fishService.getSingleFish(fishCode);
  }
}
