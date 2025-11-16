import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createTask = async({taskName, taskDescription, taskStatus}) => {
    try {
        const response = await apiClient.post('/task/addtask', {
            taskName: taskName,
            taskDescription: taskDescription,
            taskStatus: taskStatus
        })
        if(response.status === 201) toast.success('Task Created')
    }
    catch(error) {
        toast.error(error?.response.data?.message || error || 'Failed to create task')
    }
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({    
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['taskList']})
            queryClient.invalidateQueries({queryKey: ['deletedTaskList']})
        }, 
        onError: () => console.log('failed to create task')
    })
}