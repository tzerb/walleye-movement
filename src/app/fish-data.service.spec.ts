import { TestBed } from '@angular/core/testing';

import { FishDataService } from './fish-data.service';

describe('FishDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishDataService = TestBed.get(FishDataService);
    expect(service).toBeTruthy();
  });
});
