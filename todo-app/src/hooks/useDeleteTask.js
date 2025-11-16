import { apiClient } from "@/lib/apiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const deleteTask = async(taskId) => {
    try {
        const response = await apiClient.delete('/task/deletetask', {
            params: {
                taskId: taskId
            }
        })
        if (response.status === 204) {
            toast.success('Successfully deleted the task')
        }
    }
    catch (err) {
        toast.error(err?.response.data?.message || err)
    }
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: async (response, taskId, context) => {
            console.log('finished on success')
            queryClient.cancelQueries({queryKey: ['taskList']})
            const previousData = queryClient.getQueryData(['taskList'])
            await queryClient.setQueryData(['taskList'], (oldData) => {
                if(!oldData.taskList) return oldData
                oldData.taskList.filter(task => (
                    task.task_id !== taskId
                ))
            })
            return { previousData }
        },
        onError: (err) => {
            toast.error(err || 'Failed to delete task')
        },
        onSettled: () =>{
            queryClient.invalidateQueries({queryKey: ['taskList']})
            queryClient.invalidateQueries({queryKey: ['deletedTaskList']})
        }
        })
        }
//     })
// }