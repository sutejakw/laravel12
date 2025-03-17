import { IRole } from '../role';

export type IUser = {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: string;
  role: IRole;
};
