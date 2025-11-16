import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"   
import { 
    DropdownMenuContent, 
    DropdownMenu, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"


const Profile = ({user, logout}) => {

    return (
        <div className="absolute right-4 top-1 text-white w-auto h-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="hover:cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                        <DropdownMenuLabel>User Details</DropdownMenuLabel>
                        <DropdownMenuItem>
                            {user.email}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:cursor-pointer" onClick={()=> {
                            logout()
                        }}>
                            Logout
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Profile