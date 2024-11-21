import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProServicePreferenceComponent } from './pro-service-preference.component';

describe('ProServicePreferenceComponent', () => {
  let component: ProServicePreferenceComponent;
  let fixture: ComponentFixture<ProServicePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProServicePreferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProServicePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
