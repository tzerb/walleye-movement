import { Component, OnInit } from '@angular/core';
import { FishFilterData, FishFilterService } from '../fish-filter.service';

@Component({
  selector: 'app-filter-display',
  templateUrl: './filter-display.component.html',
  styleUrls: ['./filter-display.component.css']
})

export class FilterDisplayComponent implements OnInit {

  data: FishFilterData;

  ngOnInit() {
    this.fishFilterService.getFilter().subscribe(d => this.data = d);
  }

  constructor(
    private fishFilterService: FishFilterService) {
  }

  onSaveClick(): void {
    this.fishFilterService.setFilter(this.data);
  }
}
