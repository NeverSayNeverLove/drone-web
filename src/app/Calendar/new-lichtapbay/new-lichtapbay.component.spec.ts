import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLichtapbayComponent } from './new-lichtapbay.component';

describe('NewLichtapbayComponent', () => {
  let component: NewLichtapbayComponent;
  let fixture: ComponentFixture<NewLichtapbayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLichtapbayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLichtapbayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
