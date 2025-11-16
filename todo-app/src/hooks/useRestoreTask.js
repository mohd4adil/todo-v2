import { apiClient } from "@/lib/apiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const restoreTask = async(taskId) => {
    try {
        const response = await apiClient.put('/task/restore', {
            taskId: taskId
        })
        if (response.status === 200) {
            toast.success('Successfully restored the task')
        }
    }
    catch (err) {
        toast.error(err?.response.data?.message || err)
    }
}

export const useRestoreTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: restoreTask,
        onSuccess: async () => {  
            queryClient.invalidateQueries({queryKey: ['taskList']})
            queryClient.invalidateQueries({queryKey: ['deletedTaskList']}) 
        },
        onError: (err) => {
            toast.error(err || 'Failed to delete task')
        },
        })
        }
//     })
// }