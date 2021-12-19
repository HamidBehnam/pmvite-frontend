import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsListComponent } from './user-settings-list.component';

describe('UserSettingsListComponent', () => {
  let component: UserSettingsListComponent;
  let fixture: ComponentFixture<UserSettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
