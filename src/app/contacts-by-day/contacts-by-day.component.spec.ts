import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsByDayComponent } from './contacts-by-day.component';

describe('ContactsByDayComponent', () => {
  let component: ContactsByDayComponent;
  let fixture: ComponentFixture<ContactsByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
