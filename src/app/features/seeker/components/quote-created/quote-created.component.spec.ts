import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCreatedComponent } from './quote-created.component';

describe('QuoteCreatedComponent', () => {
  let component: QuoteCreatedComponent;
  let fixture: ComponentFixture<QuoteCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteCreatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
