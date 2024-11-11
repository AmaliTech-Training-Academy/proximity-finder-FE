import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceExperienceComponent } from './service-experience.component';

describe('ServiceExperienceComponent', () => {
  let component: ServiceExperienceComponent;
  let fixture: ComponentFixture<ServiceExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
