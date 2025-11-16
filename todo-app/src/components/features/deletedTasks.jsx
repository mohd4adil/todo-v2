import {
    Card,
    CardContent,
    CardHeader, 
    CardFooter,
    CardDescription,
    CardAction,
    CardTitle
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { DataTable } from './dataTable'
import { getColumns } from './columns'
import { useFetchDeletedTasks } from '@/hooks/useFetchDeletedTasks'


const DeletedTasks = ({closeCard}) => {
    const [isVisible, setIsVisible] = useState(false)
    const columns = getColumns({isTrash: true})
    const { data: tasks, isLoading, isError } = useFetchDeletedTasks()

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsVisible(true)
        }, 50);
        return () => clearTimeout(timer)
    },[])

    let taskList = tasks?.taskList

    const closeDisplay = (e) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false)
            setTimeout(() => {
                closeCard()
            },100)
        }
    }

    if (isLoading) {
        return (
            <div>
                Fetching your tasks for you
            </div>
        )
    }

    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black/50" onClick={(e) => {
            closeDisplay(e)
        }}>
            <Card className={`w-[750px] h-[650px] py-8 px-4 transition-all ease-in-out duration-100 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opactiy-0'} `}>
                <CardHeader>
                    <CardTitle className="text-left text-3xl">
                       Find your Deleted Tasks here
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <DataTable columns={columns} data={taskList} trashView={true} />
                </CardContent>
            </Card>
        </div>

    )
}

export default DeletedTasks;