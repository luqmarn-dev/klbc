import { inject, Injectable } from '@angular/core';
import { Gym } from './models/gymEnum';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Database, get, getDatabase, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LocalUser } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public gym: Gym = Gym.Batuu;
  public isSaturday = true;
  public currentUser: LocalUser = {
    email: '',
    uid: '',
    fullName: '',
    phoneNumber: 0,
    checkInCount: 0,
  };
  public currentDate: Date;
  public isLoading = false;
  public isAdmin = false;
  public isFirstTime = false;

  private db = inject(Database);
  private checkedIn = false;

  constructor(private auth: Auth, private router: Router) {
    const now = new Date();
    const offset = now.getTimezoneOffset() / 60;
    this.currentDate =
      offset === -8
        ? now
        : new Date(now.getTime() + (8 + offset) * 60 * 60 * 1000);

    this.isSaturday = this.currentDate.getDay() === 6;
  }

  googleLogin() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(async (result) => {
        this.currentUser.email = result.user!.email!;
        this.currentUser.uid = result.user!.uid;

        await this.loggedInProcess();
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  private async isAdmins() {
    let isAdmins = false;
    await get(ref(this.db, 'admins')).then((snapshot) => {
      if (snapshot.exists()) {
        const adminsString = snapshot.val() as string;
        const adminsList = adminsString.split(',');

        isAdmins = adminsList.includes(this.currentUser!.email!);
      } else {
        isAdmins = false;
      }
    });

    return isAdmins;
  }

  private async isCheckedIn() {
    const dateString = this.currentDate.toISOString().split('T')[0];

    await get(
      ref(this.db, `attendees/${dateString}/${this.currentUser!.uid}`)
    ).then((snapshot) => {
      this.checkedIn = snapshot.exists();
    });
  }

  async getUserDetail() {
    await get(ref(this.db, `users/${this.currentUser.uid}`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          const userDetail = snapshot.val() as {
            fullName: string;
            email: string;
            phone: number;
            checkInCount: number;
          };

          this.currentUser.fullName = userDetail.fullName;
          this.currentUser.email = userDetail.email;
          this.currentUser.phoneNumber = userDetail.phone;
          this.currentUser.checkInCount = userDetail.checkInCount;

          this.isFirstTime = this.currentUser.checkInCount === 0;
        }
      }
    );
  }

  async loggedInProcess() {
    await this.getUserDetail();
    await this.isCheckedIn();
    this.isAdmin = await this.isAdmins();

    if (this.isFirstTimeLogin()) {
      await this.handleFirstTimeLogin();
      return;
    }

    if (this.isAdmin) {
      this.handleAdminLogin();
    } else if (this.isSaturday) {
      await this.handleSaturdayLogin();
    }
  }

  private isFirstTimeLogin(): boolean {
    return this.currentUser.fullName === '';
  }

  private async handleFirstTimeLogin() {
    if ((!this.isSaturday && this.isAdmin) || this.isSaturday) {
      this.isLoading = false;
      this.router.navigate(['/login-first-time']);
    }
  }

  private handleAdminLogin() {
    if (!this.isSaturday) {
      this.isLoading = false;
      this.router.navigate(['/admin']);
    }
  }

  private async handleSaturdayLogin() {
    if (this.checkedIn) {
      this.isLoading = false;
      this.router.navigate(['/checked-in']);
    } else {
      this.isLoading = false;
      this.router.navigate(['/verify']);
    }
  }

  async createAccount(password: string) {
    this.isLoading = true;

    createUserWithEmailAndPassword(this.auth, this.currentUser.email, password)
      .then(async (userCredential) => {
        this.currentUser.uid = userCredential.user.uid;
        await this.createUserDb();
        await this.loggedInProcess();
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  private async createUserDb() {
    const dbRef = ref(this.db, `users/${this.currentUser.uid}`);
    await set(dbRef, {
      fullName: this.currentUser.fullName,
      email: this.currentUser.email,
      phone: this.currentUser.phoneNumber,
      checkInCount: 0,
    });
  }
}
