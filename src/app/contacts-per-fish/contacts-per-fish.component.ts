import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-contacts-per-fish",
  templateUrl: "./contacts-per-fish.component.html",
  styleUrls: ["./contacts-per-fish.component.css"]
})
export class ContactsPerFishComponent implements OnInit {

  missedContacts: Array<any>;
  displayedColumns: string[] = ['fishCode', 'contacts', 'missedContacts', 'pctMissed'];

  constructor(private fishService: FishDataService) { }

  ngOnInit() {
    this.missedContacts = this.fishService.getMissedContactsByFish();
  }
}
