import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
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
  constructor() {}
}
