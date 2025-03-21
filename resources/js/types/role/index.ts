import { GuardNameEnum } from '../constant';
import { IPermission } from '../permission';

export type IRole = {
  id: number;
  name: string;
  label?: string;
  guardName: GuardNameEnum;
  permissions: IPermission[];
};
