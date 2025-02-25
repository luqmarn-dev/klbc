import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithCredential,
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';
import { getApp, initializeApp } from 'firebase/app';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'klbc';
}
