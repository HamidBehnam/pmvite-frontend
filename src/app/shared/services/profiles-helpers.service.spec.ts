import { TestBed } from '@angular/core/testing';

import { ProfilesHelpersService } from './profiles-helpers.service';

describe('ProfilesHelpersService', () => {
  let service: ProfilesHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
