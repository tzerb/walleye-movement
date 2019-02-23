import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPerFishComponent } from './contacts-per-fish.component';

describe('ContactsPerFishComponent', () => {
  let component: ContactsPerFishComponent;
  let fixture: ComponentFixture<ContactsPerFishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsPerFishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPerFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
