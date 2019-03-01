import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FishFilterService, FishFilterData } from '../fish-filter.service';

@Component({
  selector: 'app-fish-filter-dialog',
  templateUrl: './fish-filter-dialog.component.html',
  styleUrls: ['./fish-filter-dialog.component.css']
})
export class FishFilterDialogComponent implements OnInit {

  data: FishFilterData;
  ngOnInit() {
    this.data = this.fishFilterService.getFilter();
  }

  constructor(
    public dialogRef: MatDialogRef<FishFilterDialogComponent>,
    private fishFilterService: FishFilterService) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.fishFilterService.setFilter(this.data);
    this.dialogRef.close();
  }
}


