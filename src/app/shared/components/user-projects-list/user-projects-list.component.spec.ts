import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectsListComponent } from './user-projects-list.component';

describe('UserProjectsListComponent', () => {
  let component: UserProjectsListComponent;
  let fixture: ComponentFixture<UserProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
