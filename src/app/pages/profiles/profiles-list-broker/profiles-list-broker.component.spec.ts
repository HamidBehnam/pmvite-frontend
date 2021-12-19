import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesListBrokerComponent } from './profiles-list-broker.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfilesListBrokerComponent', () => {
  let component: ProfilesListBrokerComponent;
  let fixture: ComponentFixture<ProfilesListBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesListBrokerComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesListBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
