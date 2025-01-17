import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noAuthGuard } from './register-guard.guard';

describe('noAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
