import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDetailsReviewComponent } from './pro-details-review.component';

describe('ProDetailsReviewComponent', () => {
  let component: ProDetailsReviewComponent;
  let fixture: ComponentFixture<ProDetailsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProDetailsReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProDetailsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
