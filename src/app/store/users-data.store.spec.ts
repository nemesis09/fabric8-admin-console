import { TestBed } from '@angular/core/testing';

import { UsersDataStore } from './users-data.store';

describe('UsersDataStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersDataStore = TestBed.get(UsersDataStore);
    expect(service).toBeTruthy();
  });
});
