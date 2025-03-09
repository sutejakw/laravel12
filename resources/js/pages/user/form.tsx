import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useConfirmationStore from '@/hooks/use-confirmation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { IUser } from '@/types/user';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type UserFormProps = {
    user?: IUser;
};

const UserForm = ({ user }: UserFormProps) => {
    const isEdit = !!user;

    const { data, setData, post, put, processing, errors } = useForm({
        email: user?.email || '',
        name: user?.name || '',
    });

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
            title: isEdit ? 'Edit User' : 'Create User',
            href: '/user',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl p-4">
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
