import { Component, OnInit, Input } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-movement-map",
  templateUrl: "./movement-map.component.html",
  styleUrls: ["./movement-map.component.css"]
})
export class MovementMapComponent implements OnInit {
  @Input() dataArray: any[1100][20] = [];
  //  = [
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [10, 100, 10, 100, 10, 100, 10, 100],
  //   [20, 90, 20, 90, 20, 90, 20, 90],
  //   [30, 80, 30, 80, 30, 80, 30, 80],
  //   [40, 70, 40, 70, 40, 70, 40, 70],
  //   [50, 60, 50, 60, 50, 60, 50, 60],
  //   [60, 50, 60, 50, 60, 50, 60, 50],
  //   [70, 40, 70, 40, 70, 40, 70, 40],
  //   [80, 30, 80, 30, 80, 30, 80, 30],
  //   [90, 20, 90, 20, 90, 20, 90, 20],
  //   [100, 10, 100, 10, 100, 10, 100, 10],
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  // ];
  points: number = this.dataArray.length - 1;

  title: string = "Walleye Movements through the Winnebago System";
  value: number = 0;

  lat: number = 44.2;
  lng: number = -89.0;
  zoom: number = 9;
  curDate = "nope";
  radius: number = 200;
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
  // newMarker = {
  //   label: "new",
  //   lat: 44.5,
  //   lng: -88.5,
  //   weight: 4,
  //   iconUrl: {
  //     path: `M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
  //       c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
  //       c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
  //       C400.004,190.438,392.251,182.686,382.688,182.686z`,
  //     fillColor: "#AA0000",
  //     fillOpacity: 0.2,
  //     strokeWeight: 0,
  //     scale: 0.6,
  //     rotation: 45
  //   }
  // };
  markerArray = [
    {
      label: "tester1",
      lat: 43.5,
      lng: -88,
      weight: 0,
      radius: 2000,
      options: {}
    },
    {
      label: "tester2",
      lat: 43.6,
      lng: -88,
      weight: 1,
      radius: 2000,
      options: {}
    },
    {
      label: "tester2",
      lat: 43.7,
      lng: -88,
      weight: 1,
      radius: 2000,
      options: {}
    },
    {
      label: "tester2",
      lat: 43.8,
      lng: -88,
      weight: 1,
      radius: 2000,
      options: {}
    },
    {
      label: "tester2",
      lat: 43.9,
      lng: -88,
      weight: 1,
      radius: 2000,
      options: {}
    },
    {
      label: "tester2",
      lat: 44.0,
      lng: -88,
      weight: 1,
      radius: 2000,
      options: {}
    },
    {
      label: "tester2",
      lat: 44.1,
      lng: -88,
      weight: 1,
      radius: 2000,
      options: {}
    }
  ];
  // markerArrayx = [
  //   this.newMarker,
  //   {
  //     label: "tester1",
  //     lat: 43.5,
  //     lng: -88,
  //     weight: 0,
  //     iconUrl: {
  //       path: `M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
  //         c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
  //         c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
  //         C400.004,190.438,392.251,182.686,382.688,182.686z`,
  //       fillColor: "#000000",
  //       fillOpacity: 0.1,
  //       strokeWeight: 0,
  //       scale: 0.1,
  //       rotation: 45
  //     }
  //   },
  //   {
  //     label: "tester1",
  //     lat: 43.75,
  //     lng: -88,
  //     weight: 0,
  //     iconUrl: {
  //       url:
  //         "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //       scaledSize: { height: 25, width: 25 }
  //     }
  //   }
  // ];
  // { label: "tester1", lat: 43.5, lng: -88, weight: 0, options:{} },
  // { label: "tester2", lat: 44.5, lng: -89, weight: 1, options:{} },
  // { label: "tester3", lat: 44.5, lng: -88, weight: 2, options:{} },
  // { label: "tester4", lat: 44.5, lng: -87, weight: 3, options:{} },
  // { label: "tester5", lat: 44.5, lng: -88, weight: 4, options:{} }

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
        radius: 2000,
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

        // contacts.forEach(c => {
        //   var locIndex = c.LocationId.charCodeAt(0) - "A".charCodeAt(0);
        //   var timeIndex = this.diffDays(
        //     new Date(c.Start),
        //     new Date("1/1/2011")
        //   );
        //   console.log(`${timeIndex} - ${c.Start}`);

        //   try {
        //     if (timeIndex < numDatePoints) {
        //       t.dataArray[timeIndex][locIndex] += 1;
        //     }
        //   } catch (ex) {
        //     console.log(ex);
        //   }
        //   lastContact = c;
        // });
      }
    });

    //this.markerArray.push(this.newMarker);
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

    // this.markerArray = [];
    // this.markerArray.push(m);
    // console.log(this.markerArray[0].radius + ":" + this.dataArray[0][e.value]);
    this.iconUrl = {
      path: `M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
        c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
        c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
        C400.004,190.438,392.251,182.686,382.688,182.686z`,
      fillColor: "#AA0000",
      fillOpacity: 0.9,
      strokeWeight: value * 3,
      scale: 0.1,
      rotation: 45
    };

    this.radius = 2000 * value;
  }
  onInputChange(e: any) {
    console.log("e.value: " + e.value);
    console.log("date: " + this.computeDate(e.value));
    this.changeDate(e.value);
    // var image =
    //   "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // var beachMarker = {
    //   position: { lat: 44.5, lng: -88.5 },
    //   icon: image
    // };

    // if (this.markerArray.length > 0) this.markerArray = [];
    // else this.markerArray.push(this.newMarker);
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
