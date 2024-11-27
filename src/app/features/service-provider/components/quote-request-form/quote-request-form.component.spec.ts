import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRequestFormComponent } from './quote-request-form.component';

describe('QuoteRequestFormComponent', () => {
  let component: QuoteRequestFormComponent;
  let fixture: ComponentFixture<QuoteRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
