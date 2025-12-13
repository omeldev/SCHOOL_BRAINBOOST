import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Store} from '@ngxs/store';
import {UserState} from '../../store/user/user.state';
import {AsyncPipe} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {UserAction} from '../../store/user/user.actions';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public isLoggedIn$ = inject(Store).select(UserState.isLoggedIn);
  public loggedInUser$ = inject(Store).select(UserState.getUser);

  constructor(private readonly store: Store) {
  }

  public async logout$() {
    return firstValueFrom(this.store.dispatch(new UserAction.Logout))
  }
}
