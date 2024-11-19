import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf | null {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return new Notyf({
      duration: 4000, 
      position: {
        x: 'center',
        y: 'top',
      },
    });
  }
  return null;
}