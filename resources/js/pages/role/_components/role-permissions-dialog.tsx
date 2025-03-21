import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IRole } from '@/types/role';
import { Dispatch, SetStateAction } from 'react';

interface RolePermissionsDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  dialogRole?: IRole;
}

export default function RolePermissionsDialog({ openDialog, setOpenDialog, dialogRole }: RolePermissionsDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Permissions for {dialogRole?.label}</DialogTitle>
          <DialogDescription>Below is the list of permissions assigned to the role "{dialogRole?.name}".</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-wrap gap-2">
          {dialogRole?.permissions?.map((permission) => (
            <span key={permission.id} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {permission.name}
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
