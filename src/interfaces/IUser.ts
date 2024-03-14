export interface IUserCredentials {
  name: string;
  email: string;
  password: string;
}

export type IUser = {
  name: string | null;
  email: string | null;
  token?: string;
};
