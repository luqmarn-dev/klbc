import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FeedbackComponent } from './feedback/feedback.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'feedback', component: FeedbackComponent },
];
