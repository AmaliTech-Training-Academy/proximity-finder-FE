import { TestBed } from '@angular/core/testing';

import { SeekerQuotesService } from './seeker-quotes.service';

describe('SeekerQuotesService', () => {
  let service: SeekerQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
