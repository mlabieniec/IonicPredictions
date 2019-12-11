import { TestBed } from '@angular/core/testing';

import { RecorderService } from './recorder.service';

describe('RecorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecorderService = TestBed.get(RecorderService);
    expect(service).toBeTruthy();
  });
});
