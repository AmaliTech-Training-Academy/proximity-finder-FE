import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProBasicInfoComponent } from './pro-basic-info.component';

describe('ProBasicInfoComponent', () => {
  let component: ProBasicInfoComponent;
  let fixture: ComponentFixture<ProBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProBasicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
