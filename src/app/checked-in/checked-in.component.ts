import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-checked-in',
  imports: [ButtonModule, CommonModule, ImageModule],
  templateUrl: './checked-in.component.html',
  styleUrl: './checked-in.component.scss',
})
export class CheckedInComponent {
  constructor(private sharedService: SharedService) {}

  isFirstTime() {
    return this.sharedService.isFirstTime;
  }

  feedback() {
    window.open('https://forms.gle/3Pk12Zefhtdo6evx5', '_blank');
  }

  instagram() {
    window.open('https://www.instagram.com/klboulderclub/', '_blank');
  }

  whatsapp() {
    window.open('https://wa.me/60122131313', '_blank');
  }
}
