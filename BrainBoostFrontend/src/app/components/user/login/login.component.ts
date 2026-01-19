import {Component, signal} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserService} from '../../../service/rest/user/user.service';
import {firstValueFrom} from 'rxjs';
import {LoginBean} from '../../../bean/user';
import {UserAction} from '../../../store/user/user.actions';
import {Router, RouterLink} from '@angular/router';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../bean/ToastBean';
import {form, FormField} from '@angular/forms/signals';

interface LoginFormData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormField
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private readonly loginFormModel = signal<LoginFormData>({
    username: '',
    password: ''
  });

  public readonly loginForm = form(this.loginFormModel);

  constructor(private readonly store: Store,
              private readonly userService: UserService,
              private readonly router: Router) {
  }


  public async login$() {
    const user: LoginBean = {
      username: this.loginFormModel().username,
      password: this.loginFormModel().password
    }

    if(user.username.trim() === '') {
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Username cannot be empty.`,
        type: ToastType.ERROR,
        duration: 3000
      }))
      return;
    }

    if(user.password.trim() === '') {
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Password cannot be empty.`,
        type: ToastType.ERROR,
        duration: 3000
      }))
      return;
    }

    return firstValueFrom(this.userService.login$(user)).then((user) => {
      this.store.dispatch(new UserAction.SetUser(user));
    }).then(() => {
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Welcome back, ${user.username}!`,
        type: ToastType.SUCCESS,
        duration: 3000
      }))
      this.router.navigateByUrl(this.router.createUrlTree(['/']));
    });
  }

}
