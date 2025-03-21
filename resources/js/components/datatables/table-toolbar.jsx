import { Input } from '@/components/ui/input.js';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.js';
import { Select } from '@radix-ui/react-select';
import { useState } from 'react';

const RowsPerPageSelect = ({ limit, setLimit, setParams, params, setTimeDebounce }) => (
    <Select
        value={limit}
        onValueChange={(value) => {
            setLimit(value);
            setTimeDebounce(50);
            setParams({ ...params, limit: value });
        }}
    >
        <SelectTrigger className="mr-2 h-8 w-[70px] border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none">
            <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent side="down">
            {[10, 25, 50, 100].map((limit) => (
                <SelectItem key={limit} value={`${limit}`} className="cursor-pointer focus:bg-gray-200/50">
                    {limit}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const SearchInput = ({ placeholder, search, setParams, params, setTimeDebounce }) => (
    <Input
        placeholder={placeholder || 'Search'}
        className="h-8 w-full text-xs lg:w-[250px]"
        value={search || ''}
        onChange={(e) => {
            setParams({ ...params, search: e.target.value });
            setTimeDebounce(500);
        }}
    />
);

export default function TableToolbar({ placeholder, params, setParams, setTimeDebounce, search }) {
    const [limit, setLimit] = useState((params.limit || 10).toString());

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <p className="mr-1 hidden text-xs font-medium sm:block">Rows per page</p>
                <RowsPerPageSelect limit={limit} setLimit={setLimit} setParams={setParams} params={params} setTimeDebounce={setTimeDebounce} />
            </div>

            <div className="flex-grow md:flex-grow-0">
                <SearchInput placeholder={placeholder} search={search} setParams={setParams} params={params} setTimeDebounce={setTimeDebounce} />
            </div>
        </div>
    );
}
