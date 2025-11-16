import './App.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { Navigate, useLocation, BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import { Card} from './components/ui/card'
import { Disc3 } from 'lucide-react'
import Layout from './pages/Layout'
import DashboardPage from './pages/DashboardPage'
import { SidebarProvider } from './context/SidebarContext'
import UsersPage from './pages/UsersPage'


const AuthState = ({children}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <Layout>
         <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col">
            <Card className="flex flex-col items-center justify-center p-10 w-[80vw] h-[80vh]">
            <Disc3 className="animate-bounce w-10 h-10" />
            <span className="font-sans text-lg font-semibold text-center relative w-[100vw]">
              Just a moment...
              <span className="absolute right-0 top-0 h-full w-0 bg-white animate-typing border-r-2 border-current animate-blink"></span>
            </span>
            </Card>
          </div>
        </Layout>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{from: location.pathname}} replace />
  }

  return <Layout>{children}</Layout>
}


function App() {
  return (
    <BrowserRouter>
    <SidebarProvider>
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/' element={<AuthState><HomePage/></AuthState>} />
        <Route path='/dashboard' element={<AuthState><DashboardPage/></AuthState>} />
        <Route path='/users' element={<AuthState><UsersPage/></AuthState>} />
      </Routes>
    </AuthProvider>
    </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
