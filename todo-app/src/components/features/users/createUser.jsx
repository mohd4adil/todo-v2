import { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const CreateUserDialog = ({roles, onCreate}) =>    {
    const [email, setEmail] = useState('')
    const [userRole, setUserRole] = useState('')

    return (
        <div>
            <Dialog>
                    <DialogTrigger asChild>
                    <div className="flex flex-row gap-x-2 text-white text-md bg-black h-10 justify-center items-center w-34 border-2 border-white rounded-md hover:cursor-pointer" >
                            <CirclePlus />
                            Create User
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a user</DialogTitle>
                            <DialogDescription>Add the users email and his role</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="email1">User Email</Label>
                                <Input id="email1" type="email" placeholder="johndoe@acme.corp" value={email} onChange={(e)=> setEmail(e.target.value)}></Input>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="role">User Role</Label>
                                <Select onValueChange={(value) => setUserRole(value)}>
                                    <SelectTrigger style={{ backgroundColor: 'white', color: 'black' }}>
                                        <SelectValue placeholder="Task Creator" className="bg-white text-black"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black">
                                    {roles.map(role => (
                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button>Discard</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit" onClick={() => onCreate(email, userRole)}>Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
            </Dialog>
        </div>
    )

}

export default CreateUserDialog;