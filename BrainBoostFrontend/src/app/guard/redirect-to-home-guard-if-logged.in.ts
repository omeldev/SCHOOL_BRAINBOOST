import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserState} from '../store/user/user.state';
import {map} from 'rxjs';

export const redirectToHomeGuardIfLoggedIn: CanActivateFn = (route, state) => {
  const isLoggedIn$ = inject(Store).select(UserState.isLoggedIn);
  const router = inject(Router);

  return isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        router.navigateByUrl(router.createUrlTree(['']));
        return false; // Prevent further navigation
      } else {
        return true; // Allow navigation
      }
    })
  );
};
