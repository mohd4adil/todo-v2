import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'sonner'

const fetchTaskTimeline = async({taskId}) => {
    try {
        const { data } = await apiClient.post('/task/taskhistory', {
            taskId: taskId
        })    
        console.log('data arrived: ', data?.taskData?.chartData)
        return data?.taskData?.chartData || []
    }
    catch (err) {
        toast.error(err.response.data?.message || err || 'Failed to fetch chart data')
        return []
    }
}

export const useFetchTaskTimeline = (taskId) => {
    return useQuery({
        queryKey: ['taskHistory', taskId],
        queryFn: () => fetchTaskTimeline({taskId}),
    })
}