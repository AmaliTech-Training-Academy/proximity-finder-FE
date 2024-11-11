import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInputComponent } from './provider-input.component';

describe('ProviderInputComponent', () => {
  let component: ProviderInputComponent;
  let fixture: ComponentFixture<ProviderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
