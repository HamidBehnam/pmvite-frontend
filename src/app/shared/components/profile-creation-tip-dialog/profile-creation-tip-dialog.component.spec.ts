import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreationTipDialogComponent } from './profile-creation-tip-dialog.component';

describe('ProfileCreationTipDialogComponent', () => {
  let component: ProfileCreationTipDialogComponent;
  let fixture: ComponentFixture<ProfileCreationTipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCreationTipDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreationTipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
