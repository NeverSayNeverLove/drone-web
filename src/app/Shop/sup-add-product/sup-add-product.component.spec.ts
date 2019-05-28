import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupAddProductComponent } from './sup-add-product.component';

describe('SupAddProductComponent', () => {
  let component: SupAddProductComponent;
  let fixture: ComponentFixture<SupAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
