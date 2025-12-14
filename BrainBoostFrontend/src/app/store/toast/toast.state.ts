import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ToastBean} from '../../bean/ToastBean';
import {ToastAction} from './toast.action';
import RemoveToast = ToastAction.RemoveToast;

export interface ToastModel {
  toasts: ToastBean[];
}

const DEFAULTS: ToastModel = {
  toasts: [],
}

const TOAST_TOKEN = new StateToken<ToastModel>('toast');

@State<ToastModel>({
  name: TOAST_TOKEN,
  defaults: DEFAULTS,
})
@Injectable({
  providedIn: 'root',
})
export class ToastState {
  constructor() {
  }

  @Selector()
  public static toasts(state: ToastModel) {
    return state.toasts;
  }


  @Action(ToastAction.ShowToast)
  showToast(ctx: StateContext<ToastModel>, action: ToastAction.ShowToast) {
    const state = ctx.getState();
    const id = Math.random().toString(36).substr(2, 9);
    ctx.setState({
      toasts: [...state.toasts, {
        ...action.toast,
        id,
      }]
    });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      ctx.dispatch(new RemoveToast(id));
    }, action.toast.duration);
  }

  @Action(ToastAction.RemoveToast)
  removeToast(ctx: StateContext<ToastModel>, action: RemoveToast) {
    const state = ctx.getState();
    ctx.setState({
      toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
    });
  }


}
