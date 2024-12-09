import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProDetailsComponent } from './admin-pro-details.component';

describe('AdminProDetailsComponent', () => {
  let component: AdminProDetailsComponent;
  let fixture: ComponentFixture<AdminProDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
