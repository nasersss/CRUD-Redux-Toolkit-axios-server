export interface IUser {
  id: number;
  name: string;
  email: string;
}

export enum ApiStatus {
  "loading",
  "ideal",
  "success",
  "error",
}

export interface IUserState {
  list: IUser[];
  listStatus: ApiStatus;
  createUserFormStatus: ApiStatus;
  updateUserFormStatus: ApiStatus;
}

export type IUserForm = {
  name: string;
  email: string;
};

export type IUpdateUserActionProps = {
  id: number;
  data: IUserForm;
};
