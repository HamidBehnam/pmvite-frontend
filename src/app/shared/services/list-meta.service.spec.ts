import { TestBed } from '@angular/core/testing';

import { ListMetaService } from './list-meta.service';

describe('ListMetaService', () => {
  let service: ListMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
