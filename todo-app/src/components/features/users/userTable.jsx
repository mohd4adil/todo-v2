import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"

const UserTable = ({users, roles, editUser, deleteUser}) => {

    return (
        <div className="rounded-md border-2 border-white overflow-scroll bg-black">
        <table className="w-full bg-black text-white">
            <thead>
                <tr className="border-white border-b">
                    <th className="p-4 text-xl">User Email</th>
                    <th className="p-4 text-xl">User Role</th>
                    <th className="p-4 text-xl">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.user_email} className="p-3 border-white border-1" >
                        <td className="text-lg">{user.user_email}</td>
                        {/* <td>{user.user_privilege}</td> */}
                        <td className="text-white flex justify-center py-6">
                            <Select onValueChange={(value) => editUser(user.user_email, value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={user.user_privilege}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>User Privileges</SelectLabel>
                                    {roles.map(role => (
                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td className="items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-4 w-8">
                                        <Ellipsis />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem onClick={()=> deleteUser(user.user_email)}>
                                        Delete User
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
    )
}

export default UserTable;