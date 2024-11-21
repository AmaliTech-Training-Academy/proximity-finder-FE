import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProAboutBusinessComponent } from './pro-about-business.component';

describe('ProAboutBusinessComponent', () => {
  let component: ProAboutBusinessComponent;
  let fixture: ComponentFixture<ProAboutBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProAboutBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProAboutBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
