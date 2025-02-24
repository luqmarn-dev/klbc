import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "klbc-938a9", appId: "1:172112501063:web:ca1b9a43ffca799dea1462", storageBucket: "klbc-938a9.firebasestorage.app", apiKey: "AIzaSyDKjxC3NdBzUkgm1WiKD0SC9j5quH9nNk8", authDomain: "klbc-938a9.firebaseapp.com", messagingSenderId: "172112501063", measurementId: "G-65PDME6D3B" })), provideAuth(() => getAuth())]
};
