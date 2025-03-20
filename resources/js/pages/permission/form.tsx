import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useConfirmationStore from '@/hooks/use-confirmation';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

interface FormPermissionProps {
  mode: string;
  initialData: {
    name: string;
    id: number | null;
  };
  open: boolean;
  onClose: () => void;
}

const FormPermission = ({ mode = 'add', initialData = { name: '', id: null }, open, onClose }: FormPermissionProps) => {
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({ name: '' });

  useEffect(() => {
    if (open) {
      setData('name', initialData.name ?? '');
    }
  }, [initialData, open, setData]);

  const { openConfirmation } = useConfirmationStore();

  const handleSubmit = () => {
    openConfirmation({
      title: mode === 'add' ? 'Confirm Save' : 'Confirm Update',
      description: mode === 'add' ? 'Are you sure you want to save this permission?' : 'Are you sure you want to update this permission?',
      cancelLabel: 'Cancel',
      actionLabel: mode === 'add' ? 'Save' : 'Update',
      onAction: () => {
        if (mode === 'add') {
          post(route('permission.store'), {
            onSuccess: handleSuccess,
          });
        } else {
          put(route('permission.update', initialData.id as unknown as string), {
            onSuccess: handleSuccess,
          });
        }
      },
    });
  };

  const handleSuccess = () => {
    reset();
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          clearErrors();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Permission' : 'Edit Permission'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Fill in the permission details below, then click save.' : 'Update the permission details below, then click update.'}
          </DialogDescription>
        </DialogHeader>

        <form className="mt-4 flex flex-col gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Permission Name</Label>
              <Input
                id="name"
                type="text"
                required
                autoFocus
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="e.g., create_user, delete_user"
              />
              <InputError message={errors.name} />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" disabled={processing} onClick={handleSubmit}>
            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'add' ? 'Save Permission' : 'Update Permission'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormPermission;
