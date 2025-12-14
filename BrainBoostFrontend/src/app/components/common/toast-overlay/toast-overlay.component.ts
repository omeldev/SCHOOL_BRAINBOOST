import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {ToastState} from '../../../store/toast/toast.state';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'toast-overlay',
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './toast-overlay.component.html',
  styleUrl: './toast-overlay.component.scss'
})
export class ToastOverlayComponent {

  public toasts$ = inject(Store).select(ToastState.toasts);

}
