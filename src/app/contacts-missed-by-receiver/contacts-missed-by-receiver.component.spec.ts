import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsMissedByReceiverComponent } from './contacts-missed-by-receiver.component';

describe('ContactsMissedByReceiverComponent', () => {
  let component: ContactsMissedByReceiverComponent;
  let fixture: ComponentFixture<ContactsMissedByReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsMissedByReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsMissedByReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
