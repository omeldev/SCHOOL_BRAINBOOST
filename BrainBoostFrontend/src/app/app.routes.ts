import { Routes } from '@angular/router';
import {ErrorComponent} from './components/common/error/error.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {loggedInGuardGuard} from './guard/logged-in-guard.guard';
import {FlashcardCreateComponent} from './components/flashcard/flashcard-create/flashcard-create.component';
import {FlashcardOverviewComponent} from './components/flashcard/flashcard-overview/flashcard-overview.component';
import {FlashcardLearnComponent} from './components/flashcard/flashcard-learn/flashcard-learn.component';

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
        component: FlashcardCreateComponent,

      },
      {
        path: 'overview',
        component: FlashcardOverviewComponent
      },
      {
        path: 'learn',
        component: FlashcardLearnComponent
      }
    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];
