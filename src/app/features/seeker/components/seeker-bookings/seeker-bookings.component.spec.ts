import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerBookingsComponent } from './seeker-bookings.component';

describe('SeekerBookingsComponent', () => {
  let component: SeekerBookingsComponent;
  let fixture: ComponentFixture<SeekerBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
