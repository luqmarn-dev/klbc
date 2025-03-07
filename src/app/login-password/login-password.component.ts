import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-login-password',
  imports: [
    FormsModule,
    ButtonModule,
    ImageModule,
    FloatLabelModule,
    PasswordModule,
  ],
  templateUrl: './login-password.component.html',
  styleUrl: './login-password.component.scss',
})
export class LoginPasswordComponent {
  password = '';

  constructor(private sharedService: SharedService) {}

  googleLogin() {
    this.sharedService.googleLogin();
  }
}
