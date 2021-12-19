import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreationBrokerComponent } from './profile-creation-broker.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProfileCreationBrokerComponent', () => {
  let component: ProfileCreationBrokerComponent;
  let fixture: ComponentFixture<ProfileCreationBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCreationBrokerComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AuthModule.forRoot(environment.authConfig),
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreationBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
