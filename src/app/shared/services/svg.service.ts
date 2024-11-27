import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

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

    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/home.svg')
    );

    iconRegistry.addSvgIcon(
      'arrow-right',
      sanitizer.bypassSecurityTrustResourceUrl('assets/arrow-right.svg')
    );

    iconRegistry.addSvgIcon(
      'upload',
      sanitizer.bypassSecurityTrustResourceUrl('assets/upload.svg')
    );

    iconRegistry.addSvgIcon(
      'uploads',
      sanitizer.bypassSecurityTrustResourceUrl('assets/uploads.svg')
    );

    iconRegistry.addSvgIcon(
      'arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/arrow.svg')
    );


    iconRegistry.addSvgIcon(
      'location',
      sanitizer.bypassSecurityTrustResourceUrl('assets/location.svg')

    );

    iconRegistry.addSvgIcon(
      'bookmark',
      sanitizer.bypassSecurityTrustResourceUrl('assets/bookmark.svg')
    );

    iconRegistry.addSvgIcon(
      'communication',
      sanitizer.bypassSecurityTrustResourceUrl('assets/message.svg')
    );

    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/discover-search.svg')
    );

    iconRegistry.addSvgIcon(
      'compare',
      sanitizer.bypassSecurityTrustResourceUrl('assets/arrows.svg')
    );

    iconRegistry.addSvgIcon(
      'arrow-left',
      sanitizer.bypassSecurityTrustResourceUrl('assets/arrow-left.svg')
    );

    iconRegistry.addSvgIcon(
      'star',
      sanitizer.bypassSecurityTrustResourceUrl('assets/star.svg')
    );

    iconRegistry.addSvgIcon(
      'arrow-right-feedback',
      sanitizer.bypassSecurityTrustResourceUrl('assets/arrow-right-feedback.svg')
    );

    iconRegistry.addSvgIcon(
      'service-check',
      sanitizer.bypassSecurityTrustResourceUrl('assets/circle-check.svg')
    );
  }
}
