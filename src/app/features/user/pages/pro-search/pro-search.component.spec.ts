import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProSearchComponent } from './pro-search.component';

describe('ProSearchComponent', () => {
  let component: ProSearchComponent;
  let fixture: ComponentFixture<ProSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
