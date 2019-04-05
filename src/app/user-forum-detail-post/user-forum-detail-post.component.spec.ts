import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumDetailPostComponent } from './user-forum-detail-post.component';

describe('UserForumDetailPostComponent', () => {
  let component: UserForumDetailPostComponent;
  let fixture: ComponentFixture<UserForumDetailPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForumDetailPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForumDetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
