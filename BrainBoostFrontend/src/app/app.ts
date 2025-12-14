import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/common/navbar/navbar.component';
import {ToastOverlayComponent} from './components/common/toast-overlay/toast-overlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ANGULAR-TEMPLATE-STANDALONE');
}
