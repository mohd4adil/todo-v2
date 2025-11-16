import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

const fetchTasks = async () => {
    const { data } = await apiClient.get('/task/gettodolist')    
    return data
}

export const useFetchTasks = () => {
    return useQuery({
        queryKey: ['taskList'],
        queryFn: fetchTasks,
    });
}