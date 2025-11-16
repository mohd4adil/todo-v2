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

const SignupCard = ({handleSignUp, handleGoogleSignUp, setAccountName, setEmail, setPassword, isSubmitting, isSubmittingGoogle}) => {
    const navigate = useNavigate()

    return (

        <Card className="w-[400px] h-auto ml-16">
            <CardHeader>
                <CardTitle className="text-left">Sign Up</CardTitle>
                <CardDescription className="text-left">Create your account here</CardDescription>
                <CardAction><Button onClick={()=> navigate('/login')}>Login</Button></CardAction>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="account">Account Name</Label>
                <Input id="account" type="text" placeholder="something.todo.app" onChange={(e) => setAccountName(e.target.value)}></Input>
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="johndoe@example.com" onChange={(e) => setEmail(e.target.value)}></Input>
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="some secure password" onChange={(e)=> setPassword(e.target.value)}></Input>
            </div>
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="flex flex-col space-y-6 w-full">
                    <Button onClick={()=>handleSignUp()} disabled={isSubmitting} >
                    {isSubmitting ?

                    <div className="flex flex-row space-x-2 items-center"> 
                    <LoaderCircle className="animate-spin w-auto h-auto color-black" />
                    <div>
                    Signing Up...
                    </div>
                    </div>
                    :
                    <div>
                        Sign Up
                    </div>
                    }
                    </Button>
                    <Button className="!bg-white !border-gray-300 text-sm" variant="outline" onClick={()=>handleGoogleSignUp()} disabled={isSubmittingGoogle} >

                        {isSubmittingGoogle ? 
                        <div className="flex flex-row space-x-2 items-center"> 
                        <LoaderCircle className="animate-spin w-auto h-auto color-black" />
                        <div>
                        Redirecting you to Google's Page...
                        </div>
                        </div>
                        :
                        <div className="flex flex-row space-x-2 items-center">
                            <GoogleLogo/>
                            <div>Sign Up with Google</div> 
                        </div>
                        }

                    </Button>
                </div>
                <div className="hover:underline underline-offset-4 cursor-pointer" onClick={()=>navigate('/login')}>
                    Already have an account? Log in here
                </div>
            </CardFooter>
        </Card>
        )
}

export default SignupCard;


{/* <Card className="w-[400px] h-auto ml-16">
<CardHeader>
    <CardTitle>Sign Up</CardTitle>
    <CardDescription>Enter your email address and password to sign up</CardDescription>
</CardHeader>
<CardContent className="flex flex-col space-y-4">
    <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="johndoe@example.com" onChange={(e) => setEmail(e.target.value)}></Input>
    </div>
    <div className="flex flex-col space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" placeholder="some secure password" onChange={(e)=> setPassword(e.target.value)}></Input>
    </div>
</CardContent>
<CardFooter className="flex flex-col space-y-6">

    <div className="flex flex-col space-y-6 w-full">
        <Button onClick={()=>handleSignUp()} disabled={isSubmitting} >
        {isSubmitting ?

        <div className="flex flex-row space-x-2 items-center"> 
        <LoaderCircle className="animate-spin w-auto h-auto color-black" />
        <div>
        Signing Up...
        </div>
        </div>
        :
        <div>
            Sign Up
        </div>
        }
        </Button>
        <Button className="!bg-white !border-gray-300 text-sm" variant="outline" onClick={()=>handleGoogleSignUp()} disabled={isSubmittingGoogle} >
        {isSubmittingGoogle ? 
        <div className="flex flex-row space-x-2 items-center"> 
        <LoaderCircle className="animate-spin w-auto h-auto color-black" />
        <div>
        Redirecting you to Google's Page...
        </div>
        </div>
        :
        <div className="flex flex-row space-x-2 items-center"> <GoogleLogo/><div>Sign Up with Google</div> </div>
        }
        </Button>
    </div>
    <div className="hover:underline underline-offset-4 cursor-pointer" onClick={()=>navigate('/login')}>
        Already have an account? Log in here
    </div>
</CardFooter>
</Card> */}