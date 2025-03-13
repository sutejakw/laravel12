import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface DTFilterProps<TData> {
  table: Table<TData>;
  placeholder: string;
  columnName: string;
}

export function DTFilter<TData>({
  table,
  placeholder,
  columnName
}: DTFilterProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={placeholder}
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn(columnName)?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
