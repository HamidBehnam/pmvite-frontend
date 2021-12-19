import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTasksListComponent } from './user-tasks-list.component';

describe('UserTasksListComponent', () => {
  let component: UserTasksListComponent;
  let fixture: ComponentFixture<UserTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTasksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
