import { TestBed } from '@angular/core/testing';

import { FileSizeProcessorService } from './file-size-processor.service';

describe('FileSizeProcessorService', () => {
  let service: FileSizeProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSizeProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
