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
import { definePreset } from '@primeng/themes';
import { getDatabase, provideDatabase } from '@angular/fire/database';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#A02334',
      100: '#A02334',
      200: '#A02334',
      300: '#A02334',
      400: '#A02334',
      500: '#A02334',
      600: '#A02334',
      700: '#A02334',
      800: '#A02334',
      900: '#A02334',
      950: '#A02334',
    },
  },
});

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
    provideDatabase(() => getDatabase()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAuth(() => getAuth()),
  ],
};
