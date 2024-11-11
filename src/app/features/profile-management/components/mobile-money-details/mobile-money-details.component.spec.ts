import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMoneyDetailsComponent } from './mobile-money-details.component';

describe('MobileMoneyDetailsComponent', () => {
  let component: MobileMoneyDetailsComponent;
  let fixture: ComponentFixture<MobileMoneyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMoneyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileMoneyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
