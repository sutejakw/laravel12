import { DTAction } from '@/components/datatables/table-action';
import TablePagination from '@/components/datatables/table-pagination';
import TableSortHeader from '@/components/datatables/table-sort-header';
import TableToolbar from '@/components/datatables/table-toolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useDebouncedSearch from '@/hooks/use-debounced-search';
import { BaseFilter, PaginationResponse } from '@/types';
import { IPermission } from '@/types/permission';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

interface Props extends PageProps {
  filters: BaseFilter;
}

interface DataTableProps {
  onEdit: (permission: IPermission) => void;
  onDelete: (permission: IPermission) => void;
}

export default function DataTable({ onEdit, onDelete }: DataTableProps) {
  const dataPermissions = usePage().props.permissions;
  const { data: permissions, links, meta } = dataPermissions as PaginationResponse<IPermission>;
  const { filters } = usePage<Props>().props;
  const currentRouteName = route().current() ?? '';
  const { params, setParams, setTimeDebounce } = useDebouncedSearch({
    url: route(currentRouteName),
    initialParams: filters,
  });

  const sort = (column: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      col: column,
      sort: prevParams.sort === 'asc' ? 'desc' : 'asc', // fallback aman
    }));
  };

  return (
    <div className="mt-4 space-y-4">
      <TableToolbar placeholder="Search permission" search={params.search} params={params} setParams={setParams} setTimeDebounce={setTimeDebounce} />
      <div className="flex flex-col gap-1 sm:flex-row sm:space-x-1"></div>
      <div className="">
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
              <TableHead>Guard Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="max-w-[250px] truncate">{permission.name}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{permission.guardName}</TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    <DTAction row={permission} onEdit={() => onEdit(permission)} onDelete={() => onDelete(permission)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination links={links} meta={meta} />
    </div>
  );
}
