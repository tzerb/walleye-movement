import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishFilterDialogComponent } from './fish-filter-dialog.component';

describe('FishFilterDialogComponent', () => {
  let component: FishFilterDialogComponent;
  let fixture: ComponentFixture<FishFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
