import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner'

const deleteUser = async({userEmail}) => {
    try {
        const response = await apiClient.delete('/users/delete', {
            email: userEmail,
        })
        if (response.status === 201) toast.success('User deleted successfully')
    }
    catch(error) {
        toast.error(error?.response.data?.message || error || 'Failed to create task')
    }
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userList']})
        },
        onError: () => {
            console.log('failed to delete user')
        }
    })
}