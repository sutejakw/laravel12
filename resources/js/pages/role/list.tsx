import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Users() {
  const { users, filters } = usePage().props;
  const [search, setSearch] = useState(filters.search || '');

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/role', { search });
  };

  // Handle sorting
  const handleSort = (column) => {
    const order = filters.sortBy === column && filters.order === 'asc' ? 'desc' : 'asc';
    router.get('/role', { ...filters, sortBy: column, order });
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." />
        <Button type="submit">Search</Button>
      </form>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('id')} className="cursor-pointer">
              ID {filters.sortBy === 'id' && (filters.order === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              Name {filters.sortBy === 'name' && (filters.order === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {users.links.map((link, index) => (
          <Button key={index} variant={link.active ? 'default' : 'outline'} onClick={() => router.get(link.url)} disabled={!link.url}>
            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
          </Button>
        ))}
      </div>
    </div>
  );
}
