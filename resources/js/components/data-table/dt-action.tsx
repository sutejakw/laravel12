import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface DTActionProps<TData> {
  row: Row<TData>;
  editRoute: string;
  onDelete: (value: TData) => void;
}

export const DTAction = <TData,> ({
  row, editRoute, onDelete
}: DTActionProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={editRoute}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onDelete(row.original)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
