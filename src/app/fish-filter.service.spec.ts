import { TestBed } from '@angular/core/testing';

import { FishFilterService } from './fish-filter.service';

describe('FishFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishFilterService = TestBed.get(FishFilterService);
    expect(service).toBeTruthy();
  });
});
