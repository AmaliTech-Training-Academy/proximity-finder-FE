import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { NOTYF, notyfFactory } from './shared/notify/notyf.token';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NOTYF, useFactory: notyfFactory },
    provideRouter(routes),
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
