import { Routes } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {loggedInGuardGuard} from './guard/logged-in-guard.guard';
import {FlashcardCreateComponent} from './components/flashcard/flashcard-create/flashcard-create.component';

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
    path: 'flashcard',
    children: [
      {
        path: 'create',
        component: FlashcardCreateComponent
      }
    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];
