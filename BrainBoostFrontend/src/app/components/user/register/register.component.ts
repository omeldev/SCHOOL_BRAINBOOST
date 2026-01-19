import {Component, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {RegisterBean} from '../../../bean/user';
import {UserService} from '../../../service/rest/user/user.service';
import {Store} from '@ngxs/store';
import {UserAction} from '../../../store/user/user.actions';
import {Router} from '@angular/router';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../bean/ToastBean';
import {form, FormField} from '@angular/forms/signals';

interface RegisterFormDate {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-register',
  imports: [
    FormField
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly registerFormModel = signal<RegisterFormDate>({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  public readonly registerForm = form(this.registerFormModel);

  constructor(private readonly userService: UserService,
              private readonly store: Store,
              private readonly router: Router) {
  }

  public async register$() {
    const registerBean: RegisterBean = {
      username: this.registerFormModel().username,
      password: this.registerFormModel().password,
      firstName: this.registerFormModel().firstName,
      lastName: this.registerFormModel().lastName
    };

    if(registerBean.firstName?.trim() === '') {
      this.store.dispatch(new ToastAction.ShowToast({
        message: 'First name cannot be empty.',
        type: ToastType.ERROR,
        duration: 3000
      }))
      return;
    }

    if(registerBean.lastName?.trim() === '') {
      this.store.dispatch(new ToastAction.ShowToast({
        message: 'Last name cannot be empty.',
        type: ToastType.ERROR,
        duration: 3000
      }))
      return;
    }

    if(registerBean.username?.trim() === '') {
      this.store.dispatch(new ToastAction.ShowToast({
        message: 'Username cannot be empty.',
        type: ToastType.ERROR,
        duration: 3000
      }))
      return;
    }

    if(registerBean.password?.trim() === '') {
      this.store.dispatch(new ToastAction.ShowToast({
        message: 'Password cannot be empty.',
        type: ToastType.ERROR,
        duration: 3000
      }))
      return;
    }

    return firstValueFrom(this.userService.register$(registerBean)).then((user) => {
      this.store.dispatch(new UserAction.SetUser(user));
    }).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['/'])); // Navigate to home or dashboard after login
    });
  }
}
