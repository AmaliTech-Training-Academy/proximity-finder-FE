import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProAccountComponent } from './admin-pro-account.component';

describe('AdminProAccountComponent', () => {
  let component: AdminProAccountComponent;
  let fixture: ComponentFixture<AdminProAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
