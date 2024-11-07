import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCheckComponent } from './provider-check.component';

describe('ProviderCheckComponent', () => {
  let component: ProviderCheckComponent;
  let fixture: ComponentFixture<ProviderCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
