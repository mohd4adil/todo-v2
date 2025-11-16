import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

const getUserRoles = async() => {
    try {
        const { data } = await apiClient.get('/users/roles')
        return data.roles
    }
    catch (err) {
        console.log('failed to receive user roles')
        return data.roles
    }
}

export const useFetchUserRoles = () => {
    return useQuery({
        queryFn: getUserRoles,
        queryKey: ['userRoles']
    })
}
