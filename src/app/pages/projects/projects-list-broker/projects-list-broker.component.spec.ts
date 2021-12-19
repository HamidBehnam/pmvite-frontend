import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListBrokerComponent } from './projects-list-broker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';

describe('ProjectsListBrokerComponent', () => {
  let component: ProjectsListBrokerComponent;
  let fixture: ComponentFixture<ProjectsListBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsListBrokerComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AuthModule.forRoot(environment.authConfig),
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
