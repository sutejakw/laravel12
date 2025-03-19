import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import DataTable from "./_components/datatable";
import FormRole from "./form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IRole } from "@/types/role";
import useConfirmationStore from "@/hooks/use-confirmation";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Management',
    href: '/role',
  },
  {
    title: 'List of Roles',
    href: '/role',
  },
];

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [formInitialData, setFormInitialData] = useState<{name: string; id: number|null}>({ name: '', id: null });

  const handleCreate = () => {
    setFormMode('add');
    setFormInitialData({ name: '', id: null });
    setModalOpen(true);
  };

  const handleEdit = (role: IRole) => {
    setFormMode('edit');
    setFormInitialData(role);
    setModalOpen(true);
  };

  const { openConfirmation } = useConfirmationStore();

  const handleDelete = (row: IRole) => {
    openConfirmation({
      title: 'Submit Confirmation',
      description: 'Are you sure you want to delete this role?',
      cancelLabel: 'Cancel',
      actionLabel: 'Delete',
      onAction: () => {
        router.delete(route('role.destroy', row.id));
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <div className="wrapper">
        <div className="w-full overflow-x-auto">
          <Button onClick={handleCreate}>Add Role</Button>
          <DataTable onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <FormRole mode={formMode} initialData={formInitialData} open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppLayout>
  );
}
