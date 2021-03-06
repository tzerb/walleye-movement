import { Component, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-single-fish",
  templateUrl: "./single-fish.component.html",
  styleUrls: ["./single-fish.component.css"]
})
export class SingleFishComponent implements OnInit {
  displayedColumns: string[] = ['Start', 'LocationId'];

  private singlefish: any;
  constructor(
    private route: ActivatedRoute,
    private fishService: FishDataService
  ) { }

  ngOnInit() {
    const fishCode = this.route.snapshot.paramMap.get("fishCode");
    this.singlefish = this.fishService.getSingleFish(fishCode);
  }
}
