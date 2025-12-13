import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserService} from '../../../service/rest/user/user.service';
import {BehaviorSubject, combineLatest, firstValueFrom, map} from 'rxjs';
import {LoginBean} from '../../../bean/user';
import {UserAction} from '../../../store/user/user.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private readonly userNameSubject$ = new BehaviorSubject("");
  public readonly userName$ = this.userNameSubject$.asObservable();

  private readonly passwordSubject$ = new BehaviorSubject("");
  public readonly password$ = this.passwordSubject$.asObservable();


  public readonly user$ = combineLatest([this.userName$, this.password$]).pipe(
    map(([userName, password]): LoginBean => ({
      username: userName,
      password: password
      })
    ));




  constructor(private readonly store: Store,
              private readonly userService: UserService,
              private readonly router: Router) {
  }


  public nextUserName(event: Event) {
    this.userNameSubject$.next((event.target as HTMLInputElement).value);
  }

  public nextPassword(event: Event) {
    this.passwordSubject$.next((event.target as HTMLInputElement).value);
  }

  public async login$() {
    const user = await firstValueFrom(this.user$);
    console.log(user);
    return firstValueFrom(this.userService.login$(user)).then((user) => {
      this.store.dispatch(new UserAction.SetUser(user));
    }).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['/'])); // Navigate to home or dashboard after login
    });
  }



}
