import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

const logout = () => {
    const { logout } = useAuth();
}