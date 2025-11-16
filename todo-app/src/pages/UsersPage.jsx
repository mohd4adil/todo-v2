import { useFetchUsers } from "@/hooks/users/useFetchUsers";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";
import { useFetchUserRoles } from "@/hooks/users/useFetchUserRoles";
import { useCreateUser } from "@/hooks/users/useCreateUser";
import { useEditUser } from "@/hooks/users/useEditUser"
import UserTable from "@/components/features/users/userTable";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/features/header";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react"
import CreateUserDialog from "@/components/features/users/createUser"

const UsersPage = () => {
    const { user, logout } = useAuth()
    const { data: users, isLoading, isError, error } = useFetchUsers()
    const { data: roles } = useFetchUserRoles()
    const deleteUser = useDeleteUser()
    const editUser = useEditUser()
    const createUser = useCreateUser()

    if(isLoading) {
        return (
            <div> 
                Loading Users for you..
            </div>
        )
    }

    if(isError) {
        return (
            <div> 
               Faced an error: {error}
            </div>
        )
    }

    return (
        <div className="w-full h-[100%] flex flex-col p-10 bg-[#171717] space-y-10">
            <Header
                title="Users"
                paragraph="Create, edit and delete users here"
                user={user}
                logout={logout}
            />
            <div className="flex justify-end">
                {/* <div onClick={()=> setShowCreate(true)} className="flex flex-row gap-x-2 text-white text-md bg-black h-10 justify-center items-center w-34 border-2 border-white rounded-md hover:cursor-pointer" >
                            <CirclePlus />
                            Create User
                </div> */}
                <CreateUserDialog
                    roles={roles}
                    onCreate={(email, userRole) => createUser.mutate({email, userRole}) }
                />
            </div>
            <UserTable 
                users={users} 
                roles={roles}
                deleteUser={(userEmail) => deleteUser.mutate({userEmail})}
                editUser={(userEmail, userRole) => editUser.mutate({userEmail: userEmail, userRole: userRole})}
            />
            {/* {showCreate && } */}
        <Toaster richColors position="bottom-center"/>
        </div>
    )
}

export default UsersPage;