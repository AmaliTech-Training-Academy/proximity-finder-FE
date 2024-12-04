import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCredentialsComponent } from './admin-credentials.component';

describe('AdminCredentialsComponent', () => {
  let component: AdminCredentialsComponent;
  let fixture: ComponentFixture<AdminCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCredentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
