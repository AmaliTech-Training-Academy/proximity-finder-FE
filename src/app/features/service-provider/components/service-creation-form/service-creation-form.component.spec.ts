import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreationFormComponent } from './service-creation-form.component';

describe('ServiceCreationFormComponent', () => {
  let component: ServiceCreationFormComponent;
  let fixture: ComponentFixture<ServiceCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCreationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
