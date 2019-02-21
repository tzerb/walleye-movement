import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsByHourComponent } from './contacts-by-hour.component';

describe('ContactsByHourComponent', () => {
  let component: ContactsByHourComponent;
  let fixture: ComponentFixture<ContactsByHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsByHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsByHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
