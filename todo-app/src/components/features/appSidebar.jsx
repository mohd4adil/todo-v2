import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PanelLeft, UserRoundCog, LayoutDashboard, ClipboardCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/context/SidebarContext'


export function Sidebar() {
  const { sidebarState, toggleSidebarState } = useSidebar()
  const navigate = useNavigate()

  return (
    <div className={`h-full bg-black md:z-100 text-white relative transition-all ease-linear duration-300 ${sidebarState === 'expanded' ? 'w-[150px]' : 'w-[75px]'}`}>
      <div>
        <Button className={`h-fit w-fit absolute transition-transform duration-300 ${sidebarState === 'expanded'? 'translate-x-[75px]' : 'translate-x-[37px]'}`} onClick={() => toggleSidebarState()} >
          <PanelLeft />
          </Button>
      </div>
        { sidebarState === 'expanded' ? 
      <div className="flex flex-col p-4  justify-start space-y-4">
          <h2 className='text-white font-semibold text-left'>Menu</h2>
          <div className="flex items-center justify-start w-full space-x-2 hover:cursor-pointer" onClick={() => navigate('/')}>
            <ClipboardCheck className="h-4 w-4" />
            <span>Tasks</span>
          </div>
          <div className="flex items-center justify-start w-full space-x-2 hover:cursor-pointer" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center justify-start w-full space-x-2 hover:cursor-pointer" onClick={() => navigate('/users')}>
            <UserRoundCog className="h-4 w-4" />
            <span>Users</span>
          </div>
        </div>
        :
        <div className="flex flex-col p-2 mt-4 items-center space-y-4" >
          <ClipboardCheck className="h-4 w-4 hover:cursor-pointer" onClick={() => navigate('/')} />
          <LayoutDashboard className="h-4 w-4 hover:cursor-pointer" onClick={() => navigate('/dashboard')} />
          <UserRoundCog className="h-4 w-4 hover:cursor-pointer" onClick={() => navigate('/users')} />
        </div>
        }
    </div>
  )
}