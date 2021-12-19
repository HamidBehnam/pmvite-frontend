import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsListComponent } from './project-settings-list.component';

describe('ProjectSettingsListComponent', () => {
  let component: ProjectSettingsListComponent;
  let fixture: ComponentFixture<ProjectSettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSettingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
