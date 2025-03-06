import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IUser } from '../types'

interface Users {
    users: IUser[]
}

const UsersTable = ({users}: Users) => {
  return (
    <Table className="w-full table-auto">
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead className="w-auto">Name</TableHead>
                <TableHead className="w-auto">Email</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default UsersTable
