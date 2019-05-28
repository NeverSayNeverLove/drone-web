import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumTopicListComponent } from './user-forum-topic-list.component';

describe('UserForumTopicListComponent', () => {
  let component: UserForumTopicListComponent;
  let fixture: ComponentFixture<UserForumTopicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForumTopicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForumTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
