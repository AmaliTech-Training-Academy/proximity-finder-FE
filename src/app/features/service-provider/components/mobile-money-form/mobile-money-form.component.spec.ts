import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMoneyFormComponent } from './mobile-money-form.component';

describe('MobileMoneyFormComponent', () => {
  let component: MobileMoneyFormComponent;
  let fixture: ComponentFixture<MobileMoneyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMoneyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileMoneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
