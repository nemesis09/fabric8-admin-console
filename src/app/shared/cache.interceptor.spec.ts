import { TestBed } from '@angular/core/testing';

import { CacheInterceptor } from './cache.interceptor';
import { RequestCache } from '../services/request-cache.service';

describe('CacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheInterceptor,
      RequestCache
    ]
  }));

  it('should be created', () => {
    const service: CacheInterceptor = TestBed.get(CacheInterceptor);
    expect(service).toBeTruthy();
  });
});
