import { TestBed } from '@angular/core/testing';

import { RequestCache } from './request-cache.service';

describe('RequestCache', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestCache
    ]
  }));

  it('should be created', () => {
    const service: RequestCache = TestBed.get(RequestCache);
    expect(service).toBeTruthy();
  });
});
