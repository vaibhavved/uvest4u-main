import { TestBed } from '@angular/core/testing';

import { InvestortypeService } from './investortype.service';

describe('InvestortypeService', () => {
  let service: InvestortypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestortypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
