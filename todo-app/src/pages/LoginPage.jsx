import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "sonner";
import { Particles } from "@/components/ui/particles";
import { TypingAnimation } from "@/components/ui/typing-animation";
import LoginCard from '@/components/features/login/loginCard'
import InitialLogin from "@/components/features/login/initialLogin";
import Accounts from "@/components/features/login/accounts";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, googleLogin, error, checkAccounts, createSession } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false)
    const [accountList, setAccountList] = useState([])
    const [selectedAccount, setSelectedAccount] = useState('')
    const [loginType, setLoginType] = useState('normal')
    const [token, setToken] = useState('')

    const [step, setStep] = useState(1)
    const next = () => setStep(prev => prev + 1)
    const back = () => setStep(prev => prev - 1)

    useEffect(()=>{
        if(error) {
            toast.error(error)
        }
    }, [error])
    
    useEffect(()=> {
        const queryParams = new URLSearchParams(window.location.search)
        console.log('attempting to fetch query params')
        const type = queryParams.get('type')
        const message = queryParams.get('message')

        if (type && message) {
            const toastMapping = {
                'success': () => toast.success(message),
                'fail': () => toast.error(message),
                'default': () => toast(message)
            }
            const toastDisplay = toastMapping[type] || toastMapping['default']
            toastDisplay()
        }
        const token = queryParams.get('token')
        if (token) setToken(token)
        const accounts = queryParams.get('accounts')
        if (accounts) setAccountList(JSON.parse(accounts))
            const authType = queryParams.get('authType')
        if(authType) 
            {
                setStep(2)
                setLoginType('googleLogin')
            }
            
        window.history.replaceState({}, '', window.location.pathname)
    }, [])
        
    const handleInitialCheck = async() => {
        try {
            const accounts = await checkAccounts(email)
            setAccountList(accounts)
            next()
        }
        catch(e) {
            toast.error('Account does not exist')
        }
    }

    const handleForgotPassword = () => {
        console.log('forgot password')
    }

    const handleLogin = async() => {
        if (isSubmitting) return

        setIsSubmitting(true)
        try {
            await login(email, password, selectedAccount);
        }
        catch (error) {
            console.log('error here in login page: ', error)
            toast.error(error)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const handleGoogleLogin = async() => {
        if (isSubmittingGoogle) return

        setIsSubmittingGoogle(true)
        try {
            await googleLogin()
        }
        catch (error) {
            toast.error(error)
        }
        finally {
            setIsSubmittingGoogle(false)
        }

    }

    const initiateSession = async() => {
        try {
            console.log('happy')
            await createSession(selectedAccount, token, loginType)
        }
        catch (err) {
            console.log(err)
            toast.error('Failed to login')
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
        {loginType === 'googleLogin' ?
        <div className="w-[400px] h-auto">
        {
        step === 1 && <InitialLogin
            handleInitialCheck={handleInitialCheck}
            handleForgotPassword={handleForgotPassword} 
            handleGoogleLogin={handleGoogleAuth} 
            setEmail={setEmail} 
            isSubmitting={isSubmitting}
            isSubmittingGoogle={isSubmittingGoogle}

        /> 
        }
        {
        step === 2 && <Accounts 
            accounts={accountList}
            onSubmit={(account)=> {
                setSelectedAccount(account)
                initiateSession()
            }}
        />
        }
        </div>
        :
        <div className="w-[400px] h-auto">
            {
            step === 1 && <InitialLogin
                handleInitialCheck={handleInitialCheck}
                handleForgotPassword={handleForgotPassword} 
                handleGoogleLogin={handleGoogleLogin} 
                setEmail={setEmail} 
                isSubmitting={isSubmitting}
                isSubmittingGoogle={isSubmittingGoogle}

            /> 
            }
            {
            step === 2 && <Accounts 
                accounts={accountList}
                onSubmit={(account)=> {
                    setSelectedAccount(account)
                    createSession()
                    next()
                }}
            />
            }
            {
            step === 3 && <LoginCard 
                handleForgotPassword={handleForgotPassword} 
                handleLogin={handleLogin} 
                handleGoogleLogin={handleGoogleLogin} 
                setEmail={setEmail} 
                setPassword={setPassword}
                isSubmitting={isSubmitting}
                isSubmittingGoogle={isSubmittingGoogle}
                email={email}
                selectedAccount={selectedAccount}
            />
            }
        </div>
        }
        < Toaster richColors position="bottom-center" />
        </div>
    )

}

export default LoginPage