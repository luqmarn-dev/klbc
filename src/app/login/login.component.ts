import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import {
  Auth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  User,
} from '@angular/fire/auth';

import {
  getDatabase,
  ref,
  push,
  set,
  get,
  Database,
} from '@angular/fire/database';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, ImageModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  checkedIn = false;
  notSaturday = true;

  constructor(
    public auth: Auth,
    public router: Router,
    private sharedService: SharedService
  ) {
    const now = new Date();
    const offset = now.getTimezoneOffset() / 60;
    const gmtPlus8Date =
      offset === -8
        ? now
        : new Date(now.getTime() + (8 + offset) * 60 * 60 * 1000);

    this.notSaturday = gmtPlus8Date.getDay() !== 6;
  }
  googleLogin() {
    this.sharedService.googleLogin();
  }

  emailLogin() {
    this.router.navigate(['/login-email']);
  }

  private async isCheckedIn(user: User, db: Database) {
    const now = new Date();
    const offset = now.getTimezoneOffset() / 60;
    const gmtPlus8Date =
      offset === -8
        ? now
        : new Date(now.getTime() + (8 + offset) * 60 * 60 * 1000);
    const dateString = gmtPlus8Date.toISOString().split('T')[0];

    let isCheckedIn = false;

    await get(ref(db, `attendees/${dateString}/${user.uid}`)).then(
      (snapshot) => {
        isCheckedIn = snapshot.exists();
      }
    );

    return isCheckedIn;
  }

  onFeedback() {
    window.open('https://forms.gle/3Pk12Zefhtdo6evx5', '_blank');
  }

  addAttendees(user: User, db: Database) {
    const now = new Date();
    const offset = now.getTimezoneOffset() / 60;
    const gmtPlus8Date =
      offset === -8
        ? now
        : new Date(now.getTime() + (8 + offset) * 60 * 60 * 1000);
    const dateString = gmtPlus8Date.toISOString().split('T')[0];

    const dbRef = ref(db, `attendees/${dateString}/${user.uid}`);
    set(dbRef, {
      email: user.email,
      name: user.displayName,
      phone: user.phoneNumber,
    });
  }

  async isAdmins(user: User, db: Database) {
    let isAdmins = false;
    await get(ref(db, 'admins')).then((snapshot) => {
      if (snapshot.exists()) {
        const adminsString = snapshot.val() as string;
        const adminsList = adminsString.split(',');

        isAdmins = adminsList.includes(user.email!);
      } else {
        isAdmins = false;
      }
    });

    return isAdmins;
  }
}
