import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { keepStorageGuardGuard } from './keep-storage-guard.guard';

describe('keepStorageGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => keepStorageGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
