import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fish-filter-dialog',
  templateUrl: './fish-filter-dialog.component.html',
  styleUrls: ['./fish-filter-dialog.component.css']
})
export class FishFilterDialogComponent implements OnInit {

  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<FishFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FishFilterData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface FishFilterData {
  males: boolean;
  females: boolean;
  year2011: boolean;
  year2012: boolean;
  year2013: boolean;
  wolf: boolean;
  fox: boolean;
  winnebago: boolean;
}
