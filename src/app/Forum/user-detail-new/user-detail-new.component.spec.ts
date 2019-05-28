import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailNewComponent } from './user-detail-new.component';

describe('UserDetailNewComponent', () => {
  let component: UserDetailNewComponent;
  let fixture: ComponentFixture<UserDetailNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
