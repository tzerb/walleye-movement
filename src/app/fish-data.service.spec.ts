import { TestBed } from "@angular/core/testing";

import { FishDataService } from "./fish-data.service";

describe("FishDataService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FishDataService = TestBed.get(FishDataService);
    expect(service).toBeTruthy();
  });
});

// describe("FishDataService.getMinMaxDates", () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it("should return ", () => {
//     const service: FishDataService = TestBed.get(FishDataService);
//     var minMax = service.getMinMaxDates();
//     expect(minMax.min).toBe(1300683600000);
//     expect(minMax.max).toBe(1301927612000);
//   });
// });

describe("Test initial positions", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should return ", () => {
    const service: FishDataService = TestBed.get(FishDataService);
    service.getInitialPositions();
  });
});
