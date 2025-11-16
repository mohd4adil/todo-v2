import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        console.log('using effect')

        const checkLogin = async () => {
            try {
                const response = await apiClient.post('/auth/checkLogin', {})
                console.log(response.data.user)
                setUser(response.data.user); //user object looks like: user: { email: checkSession.user_email, userRole: checkSession.user_privilege, account: decoded?.account}
                navigate('/')
            }
            catch (err) {
                console.log('failed initial check')
                setUser(null)
            }
            finally {
                setIsLoading(false)
            }
        }
        checkLogin()
    },[]);

    const checkAccounts = async(userEmail) => {
        setError('')
        try {
            const response = await apiClient.post('/auth/check-accounts', {
                email: userEmail
            })
            return response.data?.accounts
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during login')
            }
        }
    }

    const googleLogin = async() => {
        setError('');
        try {
            console.log('launching request to backend')
            const response = await apiClient.post('/auth/login', {
                type: 'googleLogin'
            })
            console.log(response)
            if (response) {
                const redirectUrl = response.data.redirectUrl
                window.location.href = `${redirectUrl}?from=login`
            }
            else {
                console.log('could not redirect')
            }
        }
        catch(err) {
            if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message)
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error during login')
            }
        }
        // window.location.href = 'http://localhost:5000/api/auth/google?from=login' //should be routed to /login backend and then rerouted from there to google's auth
    }
    const login = async (email, password, account) => { //have to change normal login to issue session
        setError('');
        try {
            console.log('sending axios request')
            const response = await apiClient.post('/auth/login', {
                accountName: account,
                email: email,
                password: password,
                type: 'normal'
            })
            console.log('finished axios request')
            console.log(JSON.stringify(response))
            if (response.status === 200 && response.data.isAuthenticated === true) {
                console.log("successfully logged in");
                setUser(response.data.user);
                navigate('/dashboard')
            }
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during login')
            }
            setUser(null)
        }
    }

    const signUp = async (email, password, accountName) => {
        setError('');
        try {
            console.log('sending axios request')
            const response = await apiClient.post('/auth/signup', {
                type: 'normal',
                email: email,
                password: password,
                accountName: accountName
            })
            if (response.status === 201) {
                console.log("successfully created user");
                navigate(`/login?type=success&message=Account+created+successfully`)
            }
            else {
                setError('Failed to create user')
                console.log('Failed to create user')
                throw new Error('Failed to create user')
            }
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
                throw new Error(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during sign up')
                throw new Error('Unexpected error occurred during sign up ')
            }
        }
    }

    const googleSignUp = async () => {
        setError('');
        try {
            console.log('sending axios request')
            const response = await apiClient.post('/auth/signup',{
                type: 'googleSignUp'
            })
            if (response) {
                const redirectUrl = response.data.redirectUrl
                window.location.href = `${redirectUrl}?from=signup`
            }
            else {
                console.log('did not receive instructions to redirect url')
            }
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during login')
            }
        }
    }

    const createSession = async(account, token) => {
        try {
            const response = await apiClient.post('/auth/session', {
                accountName: account,
                token: token
            })
            if (response.status === 201) {
                console.log('Success!!')
                navigate('/')
            }
        }
        catch {
            setError('Unexpected error occurred during login')
        }
}

    const logout = async () => {
        try {
            const response = await apiClient.post('/auth/logout')
            if (response.status === 200) {
                console.log(response.data.message)
                setUser(null)
                navigate('/login')

            }
        }
        catch(e) {
            console.log('Faced an error trying to log out: ', e)
        }   

    };

    const values = {
        user,
        isAuthenticated: !!user,
        isLoading,
        setError,
        error,
        login,
        logout,
        googleLogin,
        signUp,
        googleSignUp,
        checkAccounts,
        createSession
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within Auth Provider') 
    }
    return context;
}