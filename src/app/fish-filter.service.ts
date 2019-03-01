import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FishFilterService {

  private filter: BehaviorSubject<FishFilterData>;

  constructor() {
    this.filter = new BehaviorSubject<FishFilterData>(
      {
        males: true,
        females: true,
        year2011: true,
        year2012: true,
        year2013: true,
        wolf: true,
        fox: true,
        winnebago: true
      });


  }

  setFilter(filter: FishFilterData) {
    //this.filter = filter;
  }

  getFilter(): Observable<FishFilterData> {
    return this.filter;
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