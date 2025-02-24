import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const firebaseConfig = {
  apiKey: "AIzaSyDKjxC3NdBzUkgm1WiKD0SC9j5quH9nNk8",
  authDomain: "klbc-938a9.firebaseapp.com",
  projectId: "klbc-938a9",
  storageBucket: "klbc-938a9.firebasestorage.app",
  messagingSenderId: "172112501063",
  appId: "1:172112501063:web:ca1b9a43ffca799dea1462",
  measurementId: "G-65PDME6D3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
