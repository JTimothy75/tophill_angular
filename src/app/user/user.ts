export interface IUser {
  role: string;
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
}
