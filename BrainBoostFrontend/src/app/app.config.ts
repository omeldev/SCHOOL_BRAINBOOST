import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {NgxsModule} from '@ngxs/store';
import {UserState} from './store/user/user.state';
import {FlashcardState} from './store/flashcard/flashcard.state';
import { HttpClientModule } from '@angular/common/http';
import {ToastState} from './store/toast/toast.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([UserState, FlashcardState, ToastState]),
      HttpClientModule
    )
  ]
};
