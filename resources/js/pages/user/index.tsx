import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import UsersTable from './components/users-table';
import { IUser } from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List of Users',
        href: '/user',
    },
];

export default function User() {
    const props = usePage().props;
    const users = props.users as IUser[];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 w-full">
                <div className="w-full overflow-x-auto">
                    <UsersTable users={users} />
                </div>
            </div>
        </AppLayout>
    );
}
