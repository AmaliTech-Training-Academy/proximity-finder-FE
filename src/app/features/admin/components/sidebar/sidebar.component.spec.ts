import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent,MatIconModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.nav-group'));
    expect(navLinks.length).toBeGreaterThan(9);

    navLinks.forEach(link => {
      const icon = link.query(By.css('mat-icon'));
      const text = link.query(By.css('span'));
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
    });
  });

  it('should highlight active navigation link', () => {
    // Simulate routing to an active link
    // ... (use RouterTestingModule's testing utilities)

    const activeLink = fixture.debugElement.query(By.css('.nav-group.active-link'));
    expect(activeLink).toBeTruthy();
  });

  it('should display user profile information', () => {
    const profileImage = fixture.debugElement.query(By.css('.profile-image img'));
    const profileName = fixture.debugElement.query(By.css('.profile-details h4'));
    const profileRole = fixture.debugElement.query(By.css('.profile-details p'));
    const logoutIcon = fixture.debugElement.query(By.css('.logout-icon mat-icon'));

    expect(profileImage).toBeTruthy();
    expect(profileName).toBeTruthy();
    expect(profileRole).toBeTruthy();
    expect(logoutIcon).toBeTruthy();
  });
});
