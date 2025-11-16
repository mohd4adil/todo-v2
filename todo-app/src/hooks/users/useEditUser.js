import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner'

const editUser = async({userEmail, userRole}) => {
    try {
        const response = await apiClient.patch('/users/edit', {
            email: userEmail,
            userRole: userRole
        })
        if (response.status === 201) toast.success('User role edited successfully')
    }
    catch(error) {
        toast.error(error?.response.data?.message || error || 'Failed to create task')
    }
}

export const useEditUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userList']})
        },
        onError: (response) => {
            console.log('failed to edit user')
        }
    })
}