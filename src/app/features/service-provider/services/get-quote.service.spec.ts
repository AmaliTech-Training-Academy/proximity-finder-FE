import { TestBed } from '@angular/core/testing';

import { GetQuoteService } from './get-quote.service';

describe('GetQuoteService', () => {
  let service: GetQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
