import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FishFilterDialogComponent } from '../fish-filter-dialog/fish-filter-dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // fishFilter: FishFilterData;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onClickFilters() {
    const dialogRef = this.dialog.open(FishFilterDialogComponent, {
      width: '500px'
    });

  }
}
