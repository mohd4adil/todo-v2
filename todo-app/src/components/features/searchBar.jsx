import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRef } from "react";

const SearchBar = () => {

    const timeoutId = useRef(null)
    
    const handleSearch = (userInput) => {
        if (timeoutId.current) {
            
        }
    }

    return (
        <div className="flex flex-row items-center w-[350px] gap-x-6">
            <Input className="bg-white" type="text" placeholder="Search here..." onChange={(e)=> handleSearch(e.target.value)} ></Input>
            <div className="h-[36px] w-[46px] bg-white border-white rounded-md items-center justify-center flex hover:cursor-pointer transition-all duration-300 ease-in-out hover:ring-1 hover:ring-offset-2 hover:ring-offset-[#171717] hover:ring-white">
                <Search className="h-[20px] w-auto" />
            </div>
        </div>
    ) 
}

export default SearchBar;