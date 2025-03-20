import { GuardNameEnum } from '../constant';

export type IRole = {
  id: number;
  name: string;
  label?: string;
  guardName: GuardNameEnum;
};
