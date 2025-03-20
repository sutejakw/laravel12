import { Button } from '@/components/ui/button';
import useConfirmationStore from '@/hooks/use-confirmation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { IPermission } from '@/types/permission';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from './_components/datatable';
import FormPermission from './form';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Management',
    href: '/user',
  },
  {
    title: 'List of Permission',
    href: '/permission',
  },
];

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [formInitialData, setFormInitialData] = useState<{ name: string; id: number | null }>({ name: '', id: null });

  const handleCreate = () => {
    setFormMode('add');
    setFormInitialData({ name: '', id: null });
    setModalOpen(true);
  };

  const handleEdit = (permission: IPermission) => {
    setFormMode('edit');
    setFormInitialData(permission);
    setModalOpen(true);
  };

  const { openConfirmation } = useConfirmationStore();

  const handleDelete = (row: IPermission) => {
    console.log(row.id);

    openConfirmation({
      title: 'Submit Confirmation',
      description: 'Are you sure you want to delete this permission? Deleting this permission will also affect any roles that are using it.',
      cancelLabel: 'Cancel',
      actionLabel: 'Delete',
      onAction: () => {
        router.delete(route('permission.destroy', row.id));
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Permissions" />
      <div className="wrapper">
        <div className="w-full overflow-x-auto">
          <Button onClick={handleCreate}>Add Permission</Button>
          <DataTable onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <FormPermission mode={formMode} initialData={formInitialData} open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppLayout>
  );
}
