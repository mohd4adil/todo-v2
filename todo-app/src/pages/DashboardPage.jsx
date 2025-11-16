import { useEffect, useState } from "react"
import { useFetchStats } from "@/hooks/useFetchStats"
import { 
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter
 } from "@/components/ui/card"

import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar'
import { Frown } from 'lucide-react'
import { useAuth } from "@/context/AuthContext"
import Header from "@/components/features/header"

const DashboardPage = () => {
    const { user, logout } = useAuth()
    const { data: stats, isLoading, isError } = useFetchStats()
    const [ isVisible, setIsVisible] = useState(false)

    const taskStats = stats || []

    console.log('taskStats: ', taskStats)

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsVisible(true)
        }, 200)
        return () => clearTimeout(timer)
    },[])

    if (isLoading) {
        return (    
            <>
            <p>Loading....</p>
            </>
        )
    }

    if (taskStats.length === 0) {
        return (
            <div className="w-full h-[100vh] flex flex-col justify-center bg-[#171717] relative">
            <div className="flex flex-col text-white text-left px-12 space-y-2 absolute top-16 left-2">
                <h1 className="font-bold">Dashboard</h1>
                <p className="font-semibold">Views the progress of tasks grouped by their status </p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2 text-white">
                <Frown className="h-8 w-8" />
                <p>It's pretty empty here, create new tasks to view this dashboard.</p>
            </div>
            </div>
        )
    }
    return (
        // <div className="w-full h-[100%] p-8 flex flex-col justify-center gap-y-6 bg-[#171717]">
        <div className="h-[100vh] p-10 flex gap-y-6 flex-col bg-[#171717]">
            <Header
                    title="Dashboard"
                    paragraph="View the progress of your tasks grouped by their status"
                    user={user}
                    logout={logout}
                />
            <div>
                <div className="flex justify-center">
                <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {taskStats.map(taskStat => (
                        <Card key={taskStat.status} className='bg-black w-[250px] border-#4f4f4f'>
                        <CardHeader>
                            <CardTitle className='text-white font-bold text-2xl'>
                                {taskStat.status}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center text-white">
                        <AnimatedCircularProgressBar value={`${isVisible ? taskStat.count : 0}`} min={0} max={taskStat.total} gaugePrimaryColor="white" gaugeSecondaryColor="#4f4f4f" />
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )

}

export default DashboardPage;