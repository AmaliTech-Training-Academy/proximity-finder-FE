import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceCreationFormComponent } from './admin-service-creation-form.component';

describe('AdminServiceCreationFormComponent', () => {
  let component: AdminServiceCreationFormComponent;
  let fixture: ComponentFixture<AdminServiceCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServiceCreationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminServiceCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
