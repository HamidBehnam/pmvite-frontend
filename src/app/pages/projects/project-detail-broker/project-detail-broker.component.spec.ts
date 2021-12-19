import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailBrokerComponent } from './project-detail-broker.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';

describe('ProjectDetailBrokerComponent', () => {
  let component: ProjectDetailBrokerComponent;
  let fixture: ComponentFixture<ProjectDetailBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailBrokerComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AuthModule.forRoot(environment.authConfig),
        MatDialogModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
