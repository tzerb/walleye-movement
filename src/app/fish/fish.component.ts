import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-fish",
  templateUrl: "./fish.component.html",
  styleUrls: ["./fish.component.css"]
})
export class FishComponent implements OnInit {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private fishService: FishDataService
  ) {
    iconRegistry.addSvgIcon(
      "gender-male",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/gender-male.svg")
    );
    iconRegistry.addSvgIcon(
      "gender-female",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/gender-female.svg")
    );
  }

  fish = [];
  locations = [];
  displayedColumns: string[] = ['Region', 'Location', 'Length', 'Sex', 'Contacts', 'TaggingDate', 'FirstContact', 'Actions'];

  ngOnInit() {
    this.fishService.getCategorizedFish();
    this.fish = this.fishService.filteredFishData().sort((a, b) => {
      if (a.Region == b.Region) {
        if (a.Location == b.Location) {
          return 0;
        }
        else if (a.Location < b.Location) {
          return -1
        } else return 1;
      }
      else if (a.Region < b.Region) {
        return -1;
      } else return 1;
    });
    this.locations = this.fishService.getLocations();
  }

  getLocationText(f) {
    if (f.Contacts.length > 0) {
      var loc = this.locations.find(l => l.Id == f.Contacts[0].LocationId);
      return loc ? loc.Name : "--";
    }
    return "--";
  }
}
