import { TestBed } from '@angular/core/testing';

import { UserMobileMoneyService } from './user-mobile-money.service';

describe('UserMobileMoneyService', () => {
  let service: UserMobileMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMobileMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
