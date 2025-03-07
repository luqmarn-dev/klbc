import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { RegisterNewComponent } from './register-new/register-new.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'login-password', component: LoginPasswordComponent },
  { path: 'register-new', component: RegisterNewComponent },
];
