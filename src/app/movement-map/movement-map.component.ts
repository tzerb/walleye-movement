import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-movement-map",
  templateUrl: "./movement-map.component.html",
  styleUrls: ["./movement-map.component.css"]
})
export class MovementMapComponent implements OnInit {
  fishPositions: any = null;

  points: number = 0;
  firstDate: any;

  title: string = "Walleye Movements through the Winnebago System";
  value: number = 0;

  lat: number = 44.2;
  lng: number = -89.0;
  zoom: number = 9;

  curDate = "";
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

    this.fishPositions = this.fishService.getInitialPositions();
    this.points = this.fishPositions.positions.length;
  }

  computeDate(value: number): string {
    var date = new Date(
      this.fishPositions.minDate + value * 1000 * 24 * 60 * 60
    );
    this.curDate = date.toLocaleDateString();
    return date.toLocaleDateString();
  }

  changeDate(value: number) {
    var i = 0;
    console.log("date: " + this.computeDate(value));
    this.markerArray.forEach(m => {
      m.radius = Math.sqrt(this.fishPositions.positions[value][i]) * 1000;
      console.log(
        m.radius +
          ":" +
          this.fishPositions.positions[value][i] +
          ":" +
          Math.sqrt(this.fishPositions.positions[value][i] * 1000)
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
    this.curDate = this.computeDate(value);
    return this.computeDate(value);
  }
}
