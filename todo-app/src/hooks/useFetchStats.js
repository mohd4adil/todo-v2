import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'sonner'

const fetchStats = async() => {
    try {
        const { data } = await apiClient.get('/dashboard/stats')    
        console.log('data arrived: ', data)
        return data?.taskStats || []
    }
    catch (err) {
        toast.error(err.response.data?.message || err || 'Failed to fetch stats')
        return []
    }
}

export const useFetchStats = () => {
    return useQuery({
        queryKey: ['taskStats'],
        queryFn: fetchStats
    })
}