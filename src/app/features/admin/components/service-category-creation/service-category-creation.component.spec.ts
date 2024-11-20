import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryCreationComponent } from './service-category-creation.component';

describe('ServiceCategoryCreationComponent', () => {
  let component: ServiceCategoryCreationComponent;
  let fixture: ComponentFixture<ServiceCategoryCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCategoryCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCategoryCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
