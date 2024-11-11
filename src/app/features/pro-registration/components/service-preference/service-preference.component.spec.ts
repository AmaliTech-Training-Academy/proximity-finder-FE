import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePreferenceComponent } from './service-preference.component';

describe('ServicePreferenceComponent', () => {
  let component: ServicePreferenceComponent;
  let fixture: ComponentFixture<ServicePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePreferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
