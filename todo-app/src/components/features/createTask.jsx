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
import { useCreateTask } from '@/hooks/useCreateTask'

const CreateTask = ( {closeCard} ) => {
    const [taskName, setTaskName] = useState(null)
    const [taskDescription, setTaskDescription] = useState(null)
    const [taskStatus, setTaskStatus] = useState('To Do')
    const [isVisible, setIsVisible] = useState(false)
    const onCreate = useCreateTask()

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsVisible(true)
        }, 50);
        return () => clearTimeout(timer)
    },[])

    const closeDisplay = (e) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false)
            setTimeout(() => {
                closeCard()
            },100)
        }
    }

    const onDiscard = (e) => {
        setTaskName(null)
        setTaskDescription(null)
        setTaskStatus(null)
        closeDisplay(e)
    }

    const onSave = (e) => {
        onCreate.mutate({taskName, taskDescription, taskStatus})
        closeDisplay(e)
    }

    return (
        <div className="z-62 fixed inset-0 flex items-center justify-center bg-black/50" onClick={(e) => {
            closeDisplay(e)
        }}>
            <Card className={`w-[750px] h-[650px] py-8 px-4 gap-y-6 space-y-6 transition-all ease-in-out duration-100 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opactiy-0'} `}>
                <CardHeader>
                    <CardTitle className="text-left text-3xl">
                        Create your task here
                    </CardTitle>
                    <CardDescription className="text-left">
                        Enter details about your task such as name, description and the status of it
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-6">
                    <div className="flex flex-row  space-x-8">
                    <div className="flex flex-col gap-y-4 w-[400px] h-[100%]">
                        <Label>
                            Task Name
                        </Label>
                        <Input className="" placeholder="Go to the gym.." value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" maxlen="100">
                        </Input>

                        <Label>
                            Task Description
                        </Label>
                        <Textarea maxlen="500" placeholder="Enter your long ass description here..." value={taskDescription} onChange={(e)=> setTaskDescription(e.target.value)} /> 
                    </div>
                    <Separator orientation='vertical' />
                    <div className="flex flex-col gap-y-4">
                        <Label>Task Status</Label>
                        <Select
                        value={taskStatus}
                        onValueChange={(value)=>{
                            setTaskStatus(value)
                        }}
                        className="text-white"
                        >
                            <SelectTrigger className="w-[150px] text-white">
                                <span className="text-white">{taskStatus}</span>
                            </SelectTrigger>
                            <SelectContent className="z-63">
                                <SelectGroup>
                                    <SelectItem value="To do">To do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    </div>
                    <CardAction className="flex flex-row space-x-2">
                        <Button onClick={(e)=> {
                            onDiscard(e)
                        }}>
                            Discard
                        </Button>
                        <Button onClick={(e) => onSave(e)}>
                            Save
                        </Button> 
                    </CardAction>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default CreateTask;