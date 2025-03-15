import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { RegisterNewComponent } from './register-new/register-new.component';
import { LoginFirstTimeComponent } from './login-first-time/login-first-time.component';
import { VerifyComponent } from './verify/verify.component';
import { CheckedInComponent } from './checked-in/checked-in.component';

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
  { path: 'login-first-time', component: LoginFirstTimeComponent },
  { path: 'register-new', component: RegisterNewComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'checked-in', component: CheckedInComponent },
];
