import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IUser } from '@/types/user';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

type DeleteHandlerProps = {
    onDelete: (user: IUser) => void;
};

export const getColumns = ({ onDelete }: DeleteHandlerProps): ColumnDef<IUser>[] => [
    {
        header: 'Action',
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild >
                            <Link href={route('user.edit', user.id)}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onDelete(user)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
];

// export const columns: ColumnDef<IUser>[] = [
//     {
//         header: 'Action',
//         id: 'actions',
//         cell: ({ row }) => {
//             const user = row.original;
//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem asChild>
//                             <Link href={route('user.edit', user.id)}>Edit</Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                             onSelect={() => {
//                                 // e.preventDefault(); // Prevent menu from closing
//                                 console.log(user);

//                                 // handleDelete(user.id);
//                             }}
//                         >
//                             Delete
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             );
//         },
//     },
//     {
//         accessorKey: 'name',
//         header: 'Name',
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
// ];
