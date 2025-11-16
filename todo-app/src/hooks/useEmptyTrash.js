import { apiClient } from "@/lib/apiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const emptyTrash = async() => {
    try {
        const response = await apiClient.delete('/task/emptytrash')
        if (response.status === 204) {
            toast.success('Successfully emptied the trash')
        }
    }
    catch (err) {
        toast.error(err?.response.data?.message || err)
    }
}

export const useEmptyTrash = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: emptyTrash,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['deletedTaskList']}),
        onError: (err) => {
            toast.error(err || 'Failed to empty the trash')
        }
        })
        }
//     })
// }