import { TestBed } from '@angular/core/testing';

import { ProjectsHelpersService } from './projects-helpers.service';

describe('ProjectsHelpersService', () => {
  let service: ProjectsHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
