import { useState, useEffect } from "react";
import {   Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent } from '../components/ui/card'
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Label } from '../components/ui/label'
import { Input } from "../components/ui/input";
import GoogleLogo from "../components/ui/google";
import { useNavigate } from "react-router-dom";
import { Particles } from "@/components/ui/particles";
import { TypingAnimation } from "@/components/ui/typing-animation";
import SignupCard from "@/components/features/signup/signupCard";
import { Toaster, toast } from "sonner";  

const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountName, setAccountName] = useState('')
    const { signUp, googleSignUp, error } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        if(error) {
            toast.error(error)
        }
    }, [error])

    const handleSignUp = async() => {
        if (isSubmitting) return 

        setIsSubmitting(true)
        try {
            await signUp(email, password, accountName);
        }
        catch (err) {
            console.log(err)
            // toast.error(error)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const handleGoogleSignUp = async() => {
        if (isSubmittingGoogle) return 

        setIsSubmittingGoogle(true)
        try {
            await googleSignUp(email, password);
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="flex items-center flex-nowrap space-x-14 p-0">
            <div className="bg-black flex w-[50vw] h-[100vh] ml-0 p-0" >
                <div className="w-full h-[100wh] flex items-center justify-center px-2">
                    <TypingAnimation className="italic z-20 text-center text-white text-7xl font-bold">
                        Welcome to the most pointless To Do App
                    </TypingAnimation>
                </div>
                <Particles size={1} refresh={true} className="absolute inset-0 z-10 h-[100vh]" />
            </div>
            <div className="w-[400px] h-auto">
                <SignupCard 
                    handleSignUp={handleSignUp} 
                    handleGoogleSignUp={handleGoogleSignUp} 
                    setAccountName={setAccountName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    isSubmitting={isSubmitting}
                    isSubmittingGoogle={isSubmittingGoogle}
                />
            </div>
            < Toaster richColors position="bottom-center" />
        </div>
    )

}

export default SignUpPage