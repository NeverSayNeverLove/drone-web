import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumPostsOfTopicComponent } from './user-forum-posts-of-topic.component';

describe('UserForumPostsOfTopicComponent', () => {
  let component: UserForumPostsOfTopicComponent;
  let fixture: ComponentFixture<UserForumPostsOfTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForumPostsOfTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForumPostsOfTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
