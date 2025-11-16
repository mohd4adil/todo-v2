import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent, 
    CardDescription,
    CardAction
} from '@/components/ui/card'

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectGroup,
    SelectItem
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react'
import { useUpdateTasks } from '@/hooks/useUpdateTask';
import TaskTimeline from './tasks/taskTimeline';


const TaskDisplay = ({ task, taskId, onClose }) => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [isTaskNameEditing, setIsTaskNameEditing] = useState(false)
    const [isTaskDescriptionEditing, setIsTaskDescriptionEditing] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const mutateTask = useUpdateTasks()

    useEffect(()=> {
        let timer = setTimeout(() => {
            setIsVisible(true)
        }, 50)
        return () => clearTimeout(timer)
    },[])

    useEffect(()=> {
        setTaskName(task.task_name)
        setTaskDescription(task.task_description)
        setTaskStatus(task.status)
        setIsInitialized(true)
    },[task])

    useEffect(()=> {
        if (isInitialized && taskStatus !== task.status) {
            console.log('task status change detected: ', taskStatus)
            mutateTask.mutate({taskName, taskDescription, taskStatus, taskId})
        }
    }, [taskStatus])

    const closeDisplay = (e) => {
        if(e.target === e.currentTarget) {
            setIsVisible(false)
            setTimeout(()=> {
                onClose()
            }, 100)
        }
    }

    const saveTask = () => {
        mutateTask.mutate({taskName, taskDescription, taskStatus, taskId})
    }

    if (task && task.task_name && task.task_description && task.status)
    {
        return (
        <div className="z-50 fixed items-center inset-0 bg-black/50 flex justify-center" onClick={(e) => closeDisplay(e)}>     
        <Card className={`bg-white p-8 w-[750px] max-h-[90vh] flex flex-col transition-all ease-linear duration-100 ${isVisible === true ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onClick={(event)=>{
            if(event.target === event.currentTarget) 
                { setIsTaskNameEditing(false) 
                  setIsTaskDescriptionEditing(false)  
                }
        }}>
            <CardHeader>
                <div className="flex justify-between">
                {isTaskNameEditing ? 
                <div className="w-[70%] mb-4 relative">
                <Input 
                type="text" 
                value={taskName} 
                onChange={(e) => {
                    setTaskName(e.target.value)
                }} 
                className="w-[100%] h-[50px] text-lg md:text-3xl font-semibold text-wrap border-1-black shadow-none mb-1 p-2" /> 
                <div className="absolute right-0 justify-end">
                    <Button onClick={()=> {
                        saveTask()
                        setIsTaskNameEditing(false)
                    }} className="w-4 mr-1">
                    <Check />
                    </Button>
                    <Button onClick={() => setIsTaskNameEditing(false)} className="w-4">
                        <X />
                    </Button>
                </div>
                </div>
                :
                <div className="w-[70%] text-left hover:bg-black/15"> 
                <span 
                className="text-3xl font-semibold text-wrap" 
                onClick={(event) => {
                    if (event.target === event.currentTarget) setIsTaskNameEditing(true)
                }}>
                {taskName}
                </span>
                </div>
                }
                <Select 
                onValueChange={(value)=>{
                    setTaskStatus(value)
                }}>
                    <SelectTrigger className="w-[150px]">
                        <span className="text-white capitalize">{taskStatus}</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="To do">To do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col text-left w-[684px] text-wrap overflow-y-auto flex-1">
                <span className="font-medium text-xl mb-2">Description</span>
                {isTaskDescriptionEditing ?
                <div className="relative">
                    <Textarea 
                    maxLength="500"
                    value={taskDescription} 
                    onChange={(e)=> setTaskDescription(e.target.value)}
                    className="shadow-none md:text-md mb-1"
                    ></Textarea>
                    <div className="absolute right-0">
                        <Button onClick={()=> {
                            saveTask()
                            setIsTaskDescriptionEditing(false)
                        }} className="w-4 mr-1">
                        <Check />
                        </Button>
                        <Button onClick={() => setIsTaskDescriptionEditing(false)} className="w-4">
                            <X />
                        </Button>
                    </div>
                </div>
                :
                    <div>
                    <h3 className="hover:bg-black/15" onClick={(e)=> {
                        if (e.target === e.currentTarget) setIsTaskDescriptionEditing(true)
                    }}>{taskDescription}</h3>
                    </div>
                }
            <div className="mt-4 w-full h-[300px]">
                <span className="text-xl font-bold">Task Timeline</span>
                <TaskTimeline taskId={taskId} />        
            </div>
            </CardContent>
            <CardFooter>
            <CardAction>
                    <Button onClick={(e) => closeDisplay(e)}>Close</Button>
                </CardAction>
            </CardFooter>
        </Card>
        </div>
    )}
    else {
        return (
            <Card className="white z-100">
                <CardContent>
                    Empty
                </CardContent>
            </Card>
        )
    }
}

export default TaskDisplay;