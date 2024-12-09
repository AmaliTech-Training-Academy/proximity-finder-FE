import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProAccountInfoComponent } from './pro-account-info.component';

describe('ProAccountInfoComponent', () => {
  let component: ProAccountInfoComponent;
  let fixture: ComponentFixture<ProAccountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProAccountInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
