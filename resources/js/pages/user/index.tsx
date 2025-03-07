import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { IUser } from '@/types/user';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
// import { User } from '@/types/user';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List of Users',
        href: '/user',
    },
];

export default function User() {
    const { props } = usePage();
    const data = props.users as IUser[];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="w-full overflow-x-auto">
                    <Button asChild>
                        <Link href={route('user.create')} as="button">
                            Create
                        </Link>
                    </Button>

                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
