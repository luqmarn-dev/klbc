import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login-password',
  imports: [
    FormsModule,
    ButtonModule,
    ImageModule,
    FloatLabelModule,
    PasswordModule,
    ToastModule,
  ],
  templateUrl: './login-password.component.html',
  styleUrl: './login-password.component.scss',
})
export class LoginPasswordComponent {
  password = '';
  isLoading = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private auth: Auth
  ) {}

  continueWithPassword() {
    this.isLoading = true;
    signInWithEmailAndPassword(
      this.auth,
      this.sharedService.currentUser.email,
      this.password
    )
      .then(async (userCredential) => {
        this.sharedService.currentUser.uid = userCredential.user.uid;
        await this.sharedService.loggedInProcess();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === 'auth/wrong-password') {
          alert('Wrong password');
        } else {
          alert('Something went wrong');
        }
      });
  }

  googleLogin() {
    this.sharedService.googleLogin();
  }
}
