import { Routes } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {loggedInGuardGuard} from './guard/logged-in-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      loggedInGuardGuard
    ]
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate: [
      loggedInGuardGuard
    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];
