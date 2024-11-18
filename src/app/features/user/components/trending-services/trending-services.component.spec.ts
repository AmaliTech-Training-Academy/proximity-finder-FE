import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingServicesComponent } from './trending-services.component';

describe('TrendingServicesComponent', () => {
  let component: TrendingServicesComponent;
  let fixture: ComponentFixture<TrendingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
