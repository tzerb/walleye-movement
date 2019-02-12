import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-movement-map",
  templateUrl: "./movement-map.component.html",
  styleUrls: ["./movement-map.component.css"]
})
export class MovementMapComponent implements OnInit {
  dataArray: any[1100][20] = [];

  points: number = this.dataArray.length - 1;

  title: string = "Walleye Movements through the Winnebago System";
  value: number = 0;

  lat: number = 44.2;
  lng: number = -89.0;
  zoom: number = 9;
  curDate = "nope";
  iconUrl = {
    path: `M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
      c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
      c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
      C400.004,190.438,392.251,182.686,382.688,182.686z`,
    fillColor: "#FFFFFF",
    fillOpacity: 0.9,
    strokeWeight: 0.1,
    scale: 0.1,
    rotation: 45
  };
  paths = [
    { lat: 44, lng: -88 },
    { lat: 44, lng: -88.1 },
    { lat: 44.1, lng: -88.1 },
    { lat: 44.1, lng: -88 },
    { lat: 44, lng: -88 }
  ];

  markerArray = [];

  constructor(private fishService: FishDataService) {}

  dateMoved(date) {
    console.log(date);
  }

  diffDays(date1, date2) {
    var diff = date1.getTime() - date2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  dateOrdinal(date1) {
    return this.diffDays(date1, new Date("1/1/2011"));
  }

  ngOnInit() {
    this.markerArray = [];
    var a = this.fishService.getLocations();
    a.forEach(l =>
      this.markerArray.push({
        label: l.Name,
        lat: l.Lat,
        lng: l.Lng,
        weight: 1,
        radius: 0,
        options: {}
      })
    );

    var d = this.fishService.getFishWithMissingContactsAdded();
    var numDatePoints = 1100;
    this.points = numDatePoints;
    var numLocations = a.length;
    for (var i = 0; i < numDatePoints; i++) {
      var locArray = [];
      for (var j = 0; j < numLocations; j++) {
        locArray.push(0);
      }
      this.dataArray.push(locArray);
    }

    var t = this;
    d.forEach(f => {
      var contacts = f.Contacts;
      if (contacts) {
        var lastContact = contacts[0];

        for (var i = 1; i < contacts.length - 1; i++) {
          var locIndex =
            contacts[i].LocationId.charCodeAt(0) - "A".charCodeAt(0);
          for (
            var j = this.dateOrdinal(new Date(lastContact.Start));
            j < this.dateOrdinal(new Date(contacts[i].Start));
            j++
          ) {
            t.dataArray[j][locIndex] += 1;
            var sum = 0;
            t.dataArray[j].forEach((v: number) => (sum += v));
          }
          lastContact = contacts[i];
        }
      }
    });

    var t = this;
    setInterval(function() {
      if (t.value < 1100) {
        t.value++;
        t.changeDate(t.value);
      }
    }, 100);
  }

  computeDate(value: number): string {
    var date = new Date("1/1/2011");
    date.setDate(date.getDate() + value);
    this.curDate = date.toLocaleDateString();
    return date.toLocaleDateString();
  }

  changeDate(value: number) {
    var i = 0;
    console.log("date: " + this.computeDate(value));
    this.markerArray.forEach(m => {
      m.radius = Math.sqrt(this.dataArray[value][i]) * 1000;
      console.log(
        m.radius +
          ":" +
          this.dataArray[value][i] +
          ":" +
          Math.sqrt(this.dataArray[value][i] * 1000)
      );
      i++;
    });
  }
  onInputChange(e: any) {
    console.log("e.value: " + e.value);
    this.changeDate(e.value);
  }

  displayWith(value: number | null) {
    if (!value) {
      return 0;
    }
    var date = new Date("1/1/2011");
    date.setDate(date.getDate() + value);
    this.curDate = date.toLocaleDateString();
    return date.toLocaleDateString();
  }
}
