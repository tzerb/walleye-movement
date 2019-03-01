import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-contacts-missed-by-receiver",
  templateUrl: "./contacts-missed-by-receiver.component.html",
  styleUrls: ["./contacts-missed-by-receiver.component.css"]
})
export class ContactsMissedByReceiverComponent implements OnInit {

  missedContacts: Array<any>;
  displayedColumns: string[] = ['location', 'contacts', 'missedContacts', 'pctMissed'];

  constructor(private fishService: FishDataService) { }

  ngOnInit() {
    this.missedContacts = this.fishService.getMissedContactsByLocation();
  }
}
