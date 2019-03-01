import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FishFilterService, FishFilterData } from '../fish-filter.service';

@Component({
  selector: 'app-fish-filter-dialog',
  templateUrl: './fish-filter-dialog.component.html',
  styleUrls: ['./fish-filter-dialog.component.css']
})
export class FishFilterDialogComponent implements OnInit {

  data: FishFilterData;
  ngOnInit() {
    this.fishFilterService.getFilter().subscribe(d => this.data = d);
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


