import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailProductComponent } from './user-detail-product.component';

describe('UserDetailProductComponent', () => {
  let component: UserDetailProductComponent;
  let fixture: ComponentFixture<UserDetailProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
