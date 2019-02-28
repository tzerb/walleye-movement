import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FishFilterDialogComponent, FishFilterData } from '../fish-filter-dialog/fish-filter-dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  fishFilter: FishFilterData;

  constructor(public dialog: MatDialog) {
    this.fishFilter = {
      males: true,
      females: true,
      year2011: true,
      year2012: true,
      year2013: true,
      wolf: true,
      fox: true,
      winnebago: true
    };
  }

  ngOnInit() {
  }

  onClickFilters() {
    const dialogRef = this.dialog.open(FishFilterDialogComponent, {
      width: '500px',
      data: this.fishFilter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fishFilter = result;
    });
  }
}
