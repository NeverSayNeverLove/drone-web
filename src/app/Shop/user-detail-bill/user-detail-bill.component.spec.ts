import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailBillComponent } from './user-detail-bill.component';

describe('UserDetailBillComponent', () => {
  let component: UserDetailBillComponent;
  let fixture: ComponentFixture<UserDetailBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
