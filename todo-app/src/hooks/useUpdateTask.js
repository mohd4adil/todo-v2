import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";


const updateTask = async ({taskName, taskDescription, taskStatus, taskId}) => {
    try {
        const { data } = await apiClient.patch('/task/edittask', {
                taskName: taskName,
                taskDescription: taskDescription,
                status: taskStatus,
                taskId: taskId
        })    
        return data
    }
    catch(e) {
        console.log('ERRROR while fetching tasks ', e)
    }
}

export const useUpdateTasks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskData) => updateTask(taskData),
        onSuccess: async (updatedTask) => {
            const previousData = queryClient.getQueryData({ queryKey: ['taskList']})
            await queryClient.setQueryData(['taskList'], (oldData) => {
                oldData.taskList.map(data => (
                    data.task_id === updatedTask.taskDetails.taskId ? { ...data, ...updatedTask.taskDetails } : data
                ))
            })

            return { previousData }
        },
        onError: (err, updatedTask, context) => {
            queryClient.setQueryData(['taskList'], context.previousData)
            throw new Error('Failed to update task')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['taskList']})
            queryClient.invalidateQueries({queryKey: ['deletedTaskList']})
        }
    })
}