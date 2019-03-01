import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-contacts-by-hour",
  templateUrl: "./contacts-by-hour.component.html",
  styleUrls: ["./contacts-by-hour.component.css"]
})
export class ContactsByHourComponent implements OnInit {
  constructor(private fishService: FishDataService) {}

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [18, 48, 77, 9, 100, 27, 40], label: "Series C" }
  ];
  public lineChartLabels: Array<any> = [
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 PM"
  ];

  ngOnInit() {
    this.fishService.getContactsByHourOfDay().subscribe(chd => {
      let _lineChartData: Array<any> = [{ data: [], label: "" }];// new Array(1);

      _lineChartData[0].data = chd;
      _lineChartData[0].label = "All Fish";

      // this.lineChartData[1].data = Array(24).fill(0);
      // this.lineChartData[1].label = "Females";
  
      this.lineChartData = _lineChartData;
    });

    // this.lineChartData[0].data = this.fishService.getContactsByHourOfDay();
    // this.lineChartData[0].label = "All Fish";

    // this.lineChartData[1].data = Array(24).fill(0);
    // this.lineChartData[1].label = "Females";
  }

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label
      };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor(Math.random() * 100 + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
