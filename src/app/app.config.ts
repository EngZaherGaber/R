import { ApplicationConfig, ChangeDetectorRef, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../../public/mytheme (1)';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  providePrimeNG({
    theme: {
      preset: MyPreset,
      options: {},
    },
  }),
  provideRouter(routes), provideAnimationsAsync()]
};
