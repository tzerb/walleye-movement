import { Component, OnInit } from "@angular/core";
import { FishDataService } from "../fish-data.service";

@Component({
  selector: "app-contacts-by-day",
  templateUrl: "./contacts-by-day.component.html",
  styleUrls: ["./contacts-by-day.component.css"]
})
export class ContactsByDayComponent implements OnInit {
  constructor(private fishService: FishDataService) { }

  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: "" }
  ];

  public lineChartLabels: Array<any> = Array(366);

  ngOnInit() {
    this.fishService.getContactsByDayOfYear().subscribe(cdy => {
      let _lineChartData: Array<any> = [{ data: [], label: "" }];

      _lineChartData[0].data = cdy;
      _lineChartData[0].label = "All Fish";

      this.lineChartData = _lineChartData;
    });

    for (var i = 0; i < 366; i++) {
      if (i % 30 == 0) {
        this.lineChartLabels[i] = this.fishService.computeDateFromDayOfYear(i);
      } else {
        this.lineChartLabels[i] = "";
      }
    }
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

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
