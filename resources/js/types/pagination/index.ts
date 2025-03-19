export interface ILink {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: IMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IMetaLink {
  active: boolean;
  label: string;
  url?: string;
}
