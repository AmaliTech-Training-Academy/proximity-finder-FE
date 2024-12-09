import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProAccountsComponent } from './pro-accounts.component';

describe('ProAccountsComponent', () => {
  let component: ProAccountsComponent;
  let fixture: ComponentFixture<ProAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
