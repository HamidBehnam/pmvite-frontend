import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsFilterSortComponent } from './projects-filter-sort.component';
import { MatMenuModule } from '@angular/material/menu';

describe('ProjectsFilterSortComponent', () => {
  let component: ProjectsFilterSortComponent;
  let fixture: ComponentFixture<ProjectsFilterSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsFilterSortComponent ],
      imports: [
        MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsFilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
