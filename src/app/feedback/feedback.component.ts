import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { getDatabase, ref, set } from '@angular/fire/database';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  imports: [
    CommonModule,
    ImageModule,
    KnobModule,
    FormsModule,
    RatingModule,
    ButtonModule,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
  rating: number = 1;
  user: User;

  constructor(public auth: Auth, private router: Router) {
    this.user = this.auth.currentUser!;
  }

  onSubmit() {
    const now = new Date();
    const gmtPlus8Date = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const dateString = gmtPlus8Date.toISOString().split('T')[0];
    const db = getDatabase();

    const dbRef = ref(db, `attendees/${dateString}/${this.user.uid}`);
    set(dbRef, {
      email: this.user.email,
      name: this.user.displayName,
      rating: this.rating,
    });

    this.router.navigate(['/login']);
  }
}
