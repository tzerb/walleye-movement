import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-contacts-by-hour",
  templateUrl: "./contacts-by-hour.component.html",
  styleUrls: ["./contacts-by-hour.component.css"]
})
export class ContactsByHourComponent implements OnInit {
  fishContactsByHour: number[] = null;
  constructor(private fishService: FishDataService) {}

  ngOnInit() {
    this.fishContactsByHour = this.fishService.getContactsByHourOfDay();
  }
}
