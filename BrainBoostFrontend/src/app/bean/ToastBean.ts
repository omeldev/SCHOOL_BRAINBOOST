
export interface ToastBean {
  message: string;
  duration: number;
  type: ToastType;
  id?: string;
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}
