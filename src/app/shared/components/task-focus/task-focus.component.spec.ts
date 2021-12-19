import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFocusComponent } from './task-focus.component';

describe('TaskFocusComponent', () => {
  let component: TaskFocusComponent;
  let fixture: ComponentFixture<TaskFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFocusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
