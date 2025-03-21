import { DTAction } from '@/components/datatables/table-action';
import TablePagination from '@/components/datatables/table-pagination';
import TableSortHeader from '@/components/datatables/table-sort-header';
import TableToolbar from '@/components/datatables/table-toolbar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useDebouncedSearch from '@/hooks/use-debounced-search';
import { BaseFilter, PaginationResponse } from '@/types';
import { IRole } from '@/types/role';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import RolePermissionsDialog from '../role-permissions-dialog';

interface Props extends PageProps {
  filters: BaseFilter;
}

interface DataTableProps {
  onEdit: (role: IRole) => void;
  onDelete: (role: IRole) => void;
}

export default function DataTable({ onEdit, onDelete }: DataTableProps) {
  const dataRoles = usePage().props.roles;
  const { data: roles, links, meta } = dataRoles as PaginationResponse<IRole>;
  const { filters } = usePage<Props>().props;
  const currentRouteName = route().current() ?? '';
  const { params, setParams, setTimeDebounce } = useDebouncedSearch({
    url: route(currentRouteName),
    initialParams: filters,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogRole, setDialogRole] = useState<IRole>();

  const handleShowMore = (role: IRole) => {
    setDialogRole(role);
    setOpenDialog(true);
  };

  const sort = (column: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      col: column,
      sort: prevParams.sort === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="mt-4 space-y-4">
      <TableToolbar placeholder="Search role" search={params.search} params={params} setParams={setParams} setTimeDebounce={setTimeDebounce} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <TableSortHeader
                title="Name"
                onClick={() => {
                  setTimeDebounce(50);
                  sort('name');
                }}
                sort={params?.col === 'name' ? params?.sort : null}
              />
            </TableHead>
            <TableHead>Abilities</TableHead>
            <TableHead>Guard Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {role?.permissions?.slice(0, 4).map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {permission.name}
                      </span>
                    ))}
                    {role?.permissions?.length > 4 && (
                      <Button variant="outline" size="sm" className="px-2 py-0.5 text-xs" onClick={() => handleShowMore(role)}>
                        +{role.permissions.length - 4} more
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>{role.guardName}</TableCell>
                <TableCell>
                  <DTAction row={role} onEdit={() => onEdit(role)} onDelete={() => onDelete(role)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination links={links} meta={meta} />
      <RolePermissionsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} dialogRole={dialogRole} />
    </div>
  );
}
