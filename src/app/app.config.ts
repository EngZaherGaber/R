import { ApplicationConfig, ChangeDetectorRef, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../../public/mytheme (1)';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideLottieOptions({
    player: () => player,
  }),
  providePrimeNG({
    theme: {

      preset: MyPreset,
      options: {},
    },
  }),
  provideRouter(routes), provideAnimationsAsync()]
};
