import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

const fetchDeletedTasks = async () => {
    try {
        const { data } = await apiClient.get('/task/deletedtasks')    
        return data
    }
    catch(e) {
        console.log('ERRROR while fetching tasks ', e)
    }
}

export const useFetchDeletedTasks = () => {
    return useQuery({
        queryKey: ['deletedTaskList'],
        queryFn: fetchDeletedTasks,
    });
}