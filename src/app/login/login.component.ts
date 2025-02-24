import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
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

@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, ImageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public auth: Auth, public router: Router) {}
  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(async (result) => {
        const user = result.user;
        const db = getDatabase();
        this.addAttendees(user, db);

        if (await this.isAdmins(user, db)) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/feedback']);
        }
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  addAttendees(user: User, db: Database) {
    const now = new Date();
    const gmtPlus8Date = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const dateString = gmtPlus8Date.toISOString().split('T')[0];

    const dbRef = ref(db, `attendees/${dateString}`);
    push(dbRef, {
      email: user.email,
      name: user.displayName,
    });
  }

  isAdmins(user: User, db: Database) {
    return get(ref(db, 'admins')).then((snapshot) => {
      if (snapshot.exists()) {
        const adminsString = snapshot.val() as string;
        const adminsList = adminsString.split(',');

        return adminsList.includes(user.email!);
      }
      return false;
    });
  }
}
