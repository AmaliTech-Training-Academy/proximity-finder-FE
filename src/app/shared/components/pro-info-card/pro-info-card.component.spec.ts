import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProInfoCardComponent } from './pro-info-card.component';

describe('ProInfoCardComponent', () => {
  let component: ProInfoCardComponent;
  let fixture: ComponentFixture<ProInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProInfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
