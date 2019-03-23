import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NccCalendarComponent } from './ncc-calendar.component';

describe('NccCalendarComponent', () => {
  let component: NccCalendarComponent;
  let fixture: ComponentFixture<NccCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NccCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NccCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
