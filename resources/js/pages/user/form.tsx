import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import useConfirmationStore from '@/hooks/use-confirmation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { IRole } from '@/types/role';
import { IUser } from '@/types/user';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

type UserFormProps = {
  user?: IUser;
};

const UserForm = ({ user }: UserFormProps) => {
  const isEdit = !!user;
  const { props } = usePage();
  const roles = props.roles as IRole[];

  const { data, setData, post, put, processing, errors } = useForm({
    email: user?.email || '',
    name: user?.name || '',
    role_id: user?.role?.id || '',
  });

  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(user?.role?.id.toString() || '');
  const selectedRole = roles.find((role) => role.id.toString() === selectedRoleId);

  const { openConfirmation } = useConfirmationStore();

  const handleSubmit = () => {
    openConfirmation({
      title: 'Submit Confirmation',
      description: 'Are you sure you want to submit this item?',
      cancelLabel: 'Cancel',
      actionLabel: 'Submit',
      onAction: () => {
        if (isEdit) {
          put(route('user.update', user.id));
        } else {
          post(route('user.store'));
        }
      },
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'User Management',
      href: '/user',
    },
    {
      title: 'List of Users',
      href: '/user',
    },
    {
      title: isEdit ? 'Edit User' : 'Create User',
      href: '/user',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User" />
      <div className="wrapper">
        <div className="w-full overflow-x-auto">
          <form className="flex flex-col gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="email@example.com"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  tabIndex={2}
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Your full name"
                />
                <InputError message={errors.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Role</Label>

                <Select
                  value={selectedRoleId}
                  onValueChange={(value) => {
                    setSelectedRoleId(value);
                    setData('role_id', value); // Save the ID in form data
                  }}
                >
                  <SelectTrigger className="border-input">
                    <SelectValue placeholder="Select a role">{selectedRole ? selectedRole.name : 'Select a role'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      {roles.map((role) => (
                        <SelectItem value={role.id.toString()} key={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <InputError message={errors.role_id} />
              </div>

              <Button type="button" className="mt-4 w-full" disabled={processing} onClick={handleSubmit}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {isEdit ? 'Update' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserForm;
