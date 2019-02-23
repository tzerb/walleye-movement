import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-contacts-per-receiver",
  templateUrl: "./contacts-per-receiver.component.html",
  styleUrls: ["./contacts-per-receiver.component.css"]
})
export class ContactsPerReceiverComponent implements OnInit {
  constructor(private fishService: FishDataService) {}

  ngOnInit() {}
}
