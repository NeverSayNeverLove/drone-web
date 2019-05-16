import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLichtapbayComponent } from './edit-lichtapbay.component';

describe('EditLichtapbayComponent', () => {
  let component: EditLichtapbayComponent;
  let fixture: ComponentFixture<EditLichtapbayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLichtapbayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLichtapbayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
