import { TestBed } from '@angular/core/testing';

import { ViewFaqService } from './view-faq.service';

describe('ViewFaqService', () => {
  let service: ViewFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewFaqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
