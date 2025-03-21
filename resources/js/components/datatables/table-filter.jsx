import { Badge } from '@/components/ui/badge.js';
import { Popover, PopoverContent } from '@/components/ui/popover.js';
import { cn } from '@/lib/utils.js';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { CheckIcon, CirclePlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Command, CommandInput } from '../ui/command';
import { Separator } from '../ui/separator';

const FilterBadges = ({ selectedValues, options }) => (
    <>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
            {selectedValues.length}
        </Badge>
        <div className="hidden space-x-1 lg:flex">
            {selectedValues.length > 2 ? (
                <Badge variant="secondary" className="rounded-sm bg-gray-200/50 px-1 font-normal">
                    {selectedValues.length} selected
                </Badge>
            ) : (
                options
                    .filter((option) => selectedValues.includes(option.value))
                    .map((option) => (
                        <Badge variant="secondary" key={option.value} className="rounded-sm bg-gray-200/50 px-1 font-normal">
                            {option.label}
                        </Badge>
                    ))
            )}
        </div>
    </>
);

const FilterOptions = ({ options, params, filter, onSelectFilter }) => (
    <CommandList>
        <CommandEmpty>No filters found.</CommandEmpty>
        <CommandGroup>
            {options.map((option) => {
                const isSelected = params.filters?.includes(`${filter}:${option.value}`);
                return (
                    <CommandItem key={option.value} value={option.value} onSelect={onSelectFilter}>
                        <div
                            className={cn(
                                'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                                isSelected ? 'bg-gray-900 text-white' : 'opacity-50 [&_svg]:invisible',
                            )}
                        >
                            <CheckIcon className={cn('h-4 w-4')} />
                        </div>
                        {option.icon && <option.icon className="text-muted-foreground mr-2 h-4 w-4" />}
                        <span>{option.label}</span>
                    </CommandItem>
                );
            })}
        </CommandGroup>
    </CommandList>
);

const ClearFilters = ({ clearFilters }) => (
    <>
        <CommandSeparator />
        <CommandGroup>
            <CommandItem onSelect={clearFilters} className="justify-center text-center">
                Clear filters
            </CommandItem>
        </CommandGroup>
    </>
);

export default function TableFilter({ params, setParams, setTimeDebounce, title, filter, options }) {
    const [selectedValues, setSelectedValues] = useState([]);

    const onSelectFilter = (value) => {
        const newFilter = `${filter}:${value}`;
        let filters = params?.filters ? [...params.filters] : [];

        filters = filters.includes(newFilter) ? filters.filter((filter) => filter !== newFilter) : [...filters, newFilter];

        setTimeDebounce(50);
        setParams({ ...params, filters });
    };

    const clearFilters = () => {
        setSelectedValues([]);
        setParams({ ...params, filters: params.filters.filter((f) => !f.startsWith(`${filter}:`)) });
    };

    useEffect(() => {
        if (params.filters) {
            setSelectedValues(params.filters.filter((f) => f.startsWith(`${filter}:`)).map((f) => f.split(':')[1]));
        }
    }, [params.filters, filter]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-full border-dashed border-gray-400 text-xs hover:bg-gray-200/50 md:w-auto">
                    <CirclePlusIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues.length > 0 && <FilterBadges selectedValues={selectedValues} options={options} />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 md:w-[200px]" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <FilterOptions options={options} params={params} filter={filter} onSelectFilter={onSelectFilter} />
                    {selectedValues.length > 0 && <ClearFilters clearFilters={clearFilters} />}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
