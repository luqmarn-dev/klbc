import { Database, ref, set } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { SharedService } from '../shared.service';
import { LocalUser } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  imports: [FormsModule, CommonModule, ButtonModule, ImageModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent {
  currentUser!: LocalUser;
  currentDate!: Date;
  db = inject(Database);

  constructor(private sharedService: SharedService, private router: Router) {
    this.currentUser = sharedService.currentUser;
    this.currentDate = sharedService.currentDate;
  }

  async checkIn() {
    this.sharedService.isLoading = true;

    let dbRef = ref(this.db, 'users/' + this.currentUser.uid);
    await set(dbRef, {
      email: this.currentUser.email,
      fullName: this.currentUser.fullName,
      phoneNumber: this.currentUser.phoneNumber,
      checkInCount: ++this.currentUser.checkInCount,
    });

    const dateString = this.currentDate.toISOString().split('T')[0];

    dbRef = ref(this.db, `attendees/${dateString}/${this.currentUser.uid}`);
    await set(dbRef, {
      email: this.currentUser.email,
      fullName: this.currentUser.fullName,
      phoneNumber: this.currentUser.phoneNumber,
    });

    this.sharedService.isLoading = false;
    this.router.navigate(['/checked-in']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
