import { TestBed } from '@angular/core/testing';

import { TemporaryStorageService } from './temporary-storage.service';

describe('TemporaryStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemporaryStorageService = TestBed.get(TemporaryStorageService);
    expect(service).toBeTruthy();
  });
});
