import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesFilterSortComponent } from './profiles-filter-sort.component';
import { MatMenuModule } from '@angular/material/menu';

describe('ProfilesFilterSortComponent', () => {
  let component: ProfilesFilterSortComponent;
  let fixture: ComponentFixture<ProfilesFilterSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesFilterSortComponent ],
      imports: [
        MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesFilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
