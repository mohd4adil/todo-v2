import { useState } from "react";
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

const LoginCard = ({handleForgotPassword, handleLogin, handleGoogleLogin, setEmail, setPassword, isSubmitting, isSubmittingGoogle, email, selectedAccount}) => {
    const navigate = useNavigate()

    return (

        <Card className="w-[400px] h-auto ml-16">
            <CardHeader>
                <CardTitle className="text-left">Login</CardTitle>
                <CardDescription className="text-left">Enter your email address and password to login</CardDescription>
                <CardAction><Button onClick={()=> navigate('/signup')}>Sign Up</Button></CardAction>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="account">Account</Label>
                    <Input id="email" type="email" value={selectedAccount} disabled />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="johndoe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                </div>
                <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="some secure password" onChange={(e)=> setPassword(e.target.value)}></Input>
                </div>
                <div className="text-right hover:underline underline-offset-4 text-sm cursor-pointer" onClick={()=> handleForgotPassword()}>
                    Forgot password?
                </div>
            </CardContent>
            <CardFooter className="flex flex-col">

                <div className="flex flex-col space-y-6 w-full">
                    <Button onClick={()=>handleLogin()} disabled={isSubmitting} >
                    {isSubmitting ?

                    <div className="flex flex-row space-x-2 items-center"> 
                    <LoaderCircle className="animate-spin w-auto h-auto color-black" />
                    <div>
                    Loggin in...
                    </div>
                    </div>
                    :
                    <div>
                        Login
                    </div>
                    }
                    </Button>
                    <Button className="!bg-white !border-gray-300 text-sm" variant="outline" onClick={()=>handleGoogleLogin()} disabled={isSubmittingGoogle} >

                        {isSubmittingGoogle ? 
                        <div className="flex flex-row space-x-2 items-center"> 
                        <LoaderCircle className="animate-spin w-auto h-auto color-black" />
                        <div>
                        Redirecting you to Google's Page...
                        </div>
                        </div>
                        :
                        <div className="flex flex-row space-x-2 items-center"> <GoogleLogo/><div>Login with Google</div> </div>
                        }

                    </Button>
                </div>
            </CardFooter>
        </Card>
        )
}

export default LoginCard;