import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPerReceiverComponent } from './contacts-per-receiver.component';

describe('ContactsPerReceiverComponent', () => {
  let component: ContactsPerReceiverComponent;
  let fixture: ComponentFixture<ContactsPerReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsPerReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPerReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
