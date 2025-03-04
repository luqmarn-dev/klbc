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
import { environment } from '../environments/environment'; // Import environment

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
        apiKey: environment.firebase.apiKey,
        authDomain: environment.firebase.authDomain,
        projectId: environment.firebase.projectId,
        storageBucket: environment.firebase.storageBucket,
        messagingSenderId: environment.firebase.messagingSenderId,
        appId: environment.firebase.appId,
        measurementId: environment.firebase.measurementId,
        databaseURL: environment.firebase.databaseURL,
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
