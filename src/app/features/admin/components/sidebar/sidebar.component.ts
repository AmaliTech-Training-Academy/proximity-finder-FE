import { Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'dashboard',
      sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard.svg')
    );

    iconRegistry.addSvgIcon(
      'pro-account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/pro-account.svg')
    );

    iconRegistry.addSvgIcon(
      'users',
      sanitizer.bypassSecurityTrustResourceUrl('assets/user.svg')
    );

    iconRegistry.addSvgIcon(
      'project',
      sanitizer.bypassSecurityTrustResourceUrl('assets/projects.svg')
    );

    iconRegistry.addSvgIcon(
      'reports',
      sanitizer.bypassSecurityTrustResourceUrl('assets/clipboard.svg')
    );

    iconRegistry.addSvgIcon(
      'reviews',
      sanitizer.bypassSecurityTrustResourceUrl('assets/reviews.svg')
    );

    iconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('assets/profile.svg')
    );

    iconRegistry.addSvgIcon(
      'help',
      sanitizer.bypassSecurityTrustResourceUrl('assets/help.svg')
    );

    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/settings.svg')
    );

    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/logout.svg')
    );
  }
}
