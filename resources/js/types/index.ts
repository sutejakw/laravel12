import { LucideIcon } from 'lucide-react';
import { ILink, IMeta } from './pagination';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
  items?: SubItem[];
}

export interface SubItem {
  title: string;
  url: string;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

export interface PaginationResponse<T> {
  data: T[];
  links: ILink;
  meta: IMeta;
}

export interface MyFilterItem {
  key: string;
  value: string;
}

type ParamsValue = string | number | boolean | null | undefined | ParamsValue[] | { [key: string]: ParamsValue };
export interface BaseFilter {
  [key: string]: ParamsValue;
  search?: string;
  limit?: string;
  col?: string;
  sort?: string;
  filters?: [];
}
