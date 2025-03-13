import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { IUser } from '@/types/user';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { getColumns } from './components/columns';
import { DataTable } from './components/data-table';
import useConfirmationStore from '@/hooks/use-confirmation';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List of Users',
        href: '/user',
    },
];

export default function User() {
    const { props } = usePage();
    const data = props.users as IUser[];
    const { openConfirmation } = useConfirmationStore();

    const handleDelete = (row: IUser) => {
        openConfirmation({
            title: 'Submit Confirmation',
            description: 'Are you sure you want to delete this user?',
            cancelLabel: 'Cancel',
            actionLabel: 'Delete',
            onAction: () => {
                router.delete(route('user.destroy', row.id));
            },
        });
    };
    const columns = getColumns({ onDelete: handleDelete });

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
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
