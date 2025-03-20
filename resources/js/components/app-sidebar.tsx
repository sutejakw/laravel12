import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, SquareTerminal, UserCog } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'User Management',
    url: '#',
    icon: UserCog,
    isActive: true,
    items: [
      {
        title: 'Users',
        url: '/user',
      },
      {
        title: 'Roles',
        url: '/role',
      },
      {
        title: 'Permissions',
        url: '/permission',
      },
    ],
  },
  {
    title: 'Transaction',
    url: '#',
    icon: SquareTerminal,
    isActive: false,
    items: [
      {
        title: 'Product',
        url: '/product',
      },
      {
        title: 'Service',
        url: '/service',
      },
    ],
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    url: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    url: 'https://laravel.com/docs/starter-kits',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
