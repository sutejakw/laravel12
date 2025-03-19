import { DTAction } from '@/components/data-table/dt-action';
import { Badge } from '@/components/ui/badge';
import { IUser } from '@/types/user';
import { formatDateWithTime } from '@/utils/date';
import { ColumnDef } from '@tanstack/react-table';

type DeleteHandlerProps = {
  onDelete: (user: IUser) => void;
};

export const getColumns = ({ onDelete }: DeleteHandlerProps): ColumnDef<IUser>[] => [
  {
    accessorKey: 'number',
    header: 'Number',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'emailVerifiedAt',
    header: 'Email Verified Date',
    cell: ({ row }) => {
      const date = formatDateWithTime(row.original.emailVerifiedAt);

      if (date == '-') {
        return <Badge variant="destructive">Not Verified</Badge>;
      }

      return date;
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return row.original?.role?.label ?? '-';
    },
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      return <DTAction row={row} editRoute={route('user.edit', row.original.id)} onDelete={onDelete} />;
    },
  },
];
