import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDKjxC3NdBzUkgm1WiKD0SC9j5quH9nNk8',
        authDomain: 'klbc-938a9.firebaseapp.com',
        projectId: 'klbc-938a9',
        storageBucket: 'klbc-938a9.firebasestorage.app',
        messagingSenderId: '172112501063',
        appId: '1:172112501063:web:ca1b9a43ffca799dea1462',
        measurementId: 'G-65PDME6D3B',
        databaseURL:
          'https://klbc-938a9-default-rtdb.asia-southeast1.firebasedatabase.app',
      })
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAuth(() => getAuth()),
  ],
};
