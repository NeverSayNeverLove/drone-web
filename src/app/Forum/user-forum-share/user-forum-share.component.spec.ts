import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumShareComponent } from './user-forum-share.component';

describe('UserForumComponent', () => {
  let component: UserForumShareComponent;
  let fixture: ComponentFixture<UserForumShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForumShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForumShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
