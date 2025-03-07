import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register-new',
  imports: [
    FormsModule,
    ButtonModule,
    ImageModule,
    FloatLabelModule,
    PasswordModule,
    InputTextModule,
  ],
  templateUrl: './register-new.component.html',
  styleUrl: './register-new.component.scss',
})
export class RegisterNewComponent {
  password = '';
  fullName = '';

  constructor() {}
}
