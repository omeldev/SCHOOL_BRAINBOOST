import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {NgxsModule, provideStates, provideStore} from '@ngxs/store';
import {UserState} from './store/user/user.state';
import {FlashcardState} from './store/flashcard/flashcard.state';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([UserState, FlashcardState]),
      HttpClientModule
    )
  ]
};
