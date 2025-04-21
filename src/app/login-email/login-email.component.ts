import { Database, ref, get, child } from '@angular/fire/database';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-email',
  imports: [
    ButtonModule,
    ImageModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './login-email.component.html',
  styleUrl: './login-email.component.scss',
})
export class LoginEmailComponent {
  email = '';
  password = '';
  private db = inject(Database);
  isLoading = false;
  constructor(private sharedService: SharedService, private router: Router) {}

  continueWithEmail() {
    this.isLoading = true;
    const dbRef = ref(this.db, 'users/');
    this.sharedService.currentUser.email = this.email;

    get(child(dbRef, '/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const users = snapshot.val();
          const userEmails = Object.values(users).map(
            (user: any) => user.email as string
          );
          this.isLoading = false;
          if (userEmails.includes(this.email)) {
            this.router.navigate(['/login-password']);
          } else {
            this.router.navigate(['/register-new']);
          }
        } else {
          this.router.navigate(['/register-new']);
          console.log('DB Error');
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      });
  }

  googleLogin() {
    this.sharedService.googleLogin();
  }
}
