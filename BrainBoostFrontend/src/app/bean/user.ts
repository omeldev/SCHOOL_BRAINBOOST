export interface UserBean {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface LoginBean {
  username: string;
  password: string;
}

export interface RegisterBean extends Partial<UserBean> {
  password: string;
}
