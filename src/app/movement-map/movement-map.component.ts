import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FishDataService, IFishModel } from "../fish-data.service";

@Component({
  selector: "app-movement-map",
  templateUrl: "./movement-map.component.html",
  styleUrls: ["./movement-map.component.css"]
})
export class MovementMapComponent implements OnInit {

  @Input() code: string;

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
    path: `M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z`,
    fillColor: "#000000",
    fillOpacity: 0.9,
    strokeWeight: 0.1,
    scale: 0.75,
    rotation: 0
  };

  iconUrlArrow = {
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

  constructor(private route: ActivatedRoute, private fishService: FishDataService) { }

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
        count: "n/a",
        options: {}
      })
    );

    if (this.code) {
      const singlefish = this.fishService.getSingleFish(this.code);
      this.fishPositions = this.fishService.getPositionsForOneFish(singlefish);
    } else {
      this.fishPositions = this.fishService.getInitialPositions();
    }
    this.points = this.fishPositions.positions.length - 1;
    this.changeDate(0);
  }

  computeDate(value: number): string {
    var date = new Date(
      this.fishPositions.minDate + value * 1000 * 24 * 60 * 60
    );
    this.curDate = date.toLocaleDateString();
    return date.toLocaleDateString();
  }

  nextDate() {
    if (this.value < this.points) this.value++;
    this.changeDate(this.value);
  }

  prevDate() {
    if (this.value > 0) this.value--;
    this.changeDate(this.value);
  }

  changeDate(value: number) {
    var i = 0;
    this.computeDate(value);
    this.markerArray.forEach(m => {
      m.count = this.fishPositions.positions[value][i].toString();
      m.radius = Math.sqrt(this.fishPositions.positions[value][i]) * 1000;
      i++;
    });
  }

  onInputChange(e: any) {
    this.changeDate(e.value);
  }

  displayWith(value: number | null) {
    return value.toString();
  }

}
