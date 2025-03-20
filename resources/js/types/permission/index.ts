import { GuardNameEnum } from '../constant';

export type IPermission = {
  id: number;
  name: string;
  guardName: GuardNameEnum;
};
