import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

const getUserList = async() => {
    try {
        const { data } = await apiClient.get('/users/list')
        return data?.users
    }
    catch (err) {
        console.log('failed to receive user list')

    }
}

export const useFetchUsers = () => {
    return useQuery({
        queryFn: getUserList,
        queryKey: ['userList']
    })
}
