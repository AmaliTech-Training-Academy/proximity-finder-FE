import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiLoaderComponent } from './ai-loader.component';

describe('AiLoaderComponent', () => {
  let component: AiLoaderComponent;
  let fixture: ComponentFixture<AiLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
