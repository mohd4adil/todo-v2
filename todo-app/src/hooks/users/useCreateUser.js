import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner'

const createUser = async({email, userRole}) => {

    try {    
        const response = await apiClient.post('/users/create', {
            email: email,
            userRole: userRole
        })
        if (response.status === 201) toast.success('User created successfully')
    }
    catch(error) {
        toast.error(error?.response.data?.message || error || 'Failed to create user')
    }
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userList']})
        },
        onError: () => {
            console.log('failed to create user')
        }
    })
}