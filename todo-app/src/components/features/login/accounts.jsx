import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react";
import GoogleLogo from "@/components/ui/google";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label'
import { Input } from "@/components/ui/input";
import {   
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const Accounts = ({accounts, onSubmit}) => {
    const navigate = useNavigate()

    if (accounts.length === 0) {
        return (
            <div className="w-[400px] h-auto">
            <Card className="w-[400px] h-auto ml-16">
                <CardHeader>
                    <CardTitle className='font-sans text-2xl'>
                        No accounts available                    
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    Create an Account to get started
                </CardContent>
                <CardFooter className="items-center justify-center">
                    <CardAction>
                        <Button onClick={()=> navigate('/signup')}>
                            Sign Up here
                        </Button>
                    </CardAction>
                </CardFooter>
                <div className="space-y-3">
                </div>
            </Card>
            </div>
        )
    }

    return (
        <div className="w-[400px] h-auto">
        <Card className="w-[400px] h-auto ml-16">
            <CardHeader>
                <CardTitle>
                    Choose your desired account
                </CardTitle>
            </CardHeader>
            <div className="space-y-3">
            <ul>
                {accounts.map(account => (
                    <li  key={account.account}>
                        <div className="flex flex-col items-center space-y-2">
                        <div className={`hover:cursor-pointer hover:bg-black/20 justify-center w-[50%] round-large`} 
                            onClick={() => {
                                console.log(`${account.account} has been clicked`)
                                onSubmit(account.account)
                            }}>
                        {   account.account}
                        </div>
                        <Separator orientation="horizontal" className="justify-center"/>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </Card>
        </div>
        )
}

export default Accounts;