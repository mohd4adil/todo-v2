import { Button } from "@/components/ui/button"
import { useFetchTasks } from "../hooks/useFetchTasks"
import { getColumns } from "../components/features/columns"
import { DataTable } from "../components/features/dataTable"
import { Toaster } from "sonner"
import { useState, useEffect } from "react"
import TaskDisplay from "@/components/features/taskDisplay"
import CreateTask from "@/components/features/createTask"
import DeletedTasks from "@/components/features/deletedTasks"
import { useAuth } from "@/context/AuthContext"
import { Bubbles } from "lucide-react"
import Header from "@/components/features/header"


const HomePage = () => {

    const { data: tasks, isLoading, isError, error } = useFetchTasks()
    const { user, logout } = useAuth()
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [selectedTaskData, setSelectedTaskData] = useState(null)
    const [showCreate, setShowCreate] = useState(false)
    const [trashOpen, setTrashOpen] = useState(false)
    const columns = getColumns({isTrash: false})

    let taskList = tasks?.taskList || []

    useEffect(() => {
        if(taskList) {
            const selectedTaskDetails = taskList.find(task => task.task_id === selectedTaskId)
            setSelectedTaskData(selectedTaskDetails)
        }
    }, [selectedTaskId])

    useEffect(()=> {
        console.log('checking is loading status: ', isLoading)
    }, [isLoading])

    if (isLoading) {
        return (
        <div className="flex flex-row overflow-x-hidden bg-[#171717]">
          <div className="h-[100vh] w-screen bg-transparent flex flex-col items-center justify-center text-white">
            <Bubbles className="h-8 w-8 animate-spin mb-2 color-white" />
            Cooking up your tasks...
          </div>
        </div>
        )
    }

    if(isError) {
        return (
            <div className="bg-red">
                Error faced here: {error.message}
            </div>
        )
    }

    return (
        <div className="h-[100vh] p-10 flex gap-y-6 flex-col bg-[#171717]">
            <Header
                title="Tasks"
                paragraph="View, update and delete all of your tasks in this page right here. "
                user={user}
                logout={logout}
            />
            <div className="container mx-auto animate-fade-in">
                <DataTable columns={columns} data={taskList} setSelectedTaskId={setSelectedTaskId} onCreate={()=> setShowCreate(true)} onOpenTrash={()=>setTrashOpen(!trashOpen)} />
            </div>
            {selectedTaskId && selectedTaskData && (
                <div className="z-50 fixed items-center justify-center m-auto">
                <TaskDisplay task={selectedTaskData} taskId={selectedTaskId} onClose={()=> {
                    setSelectedTaskId(null)
                    setSelectedTaskData(null) 
            }}
            />
                </div>
)}
            {showCreate && (
                <div className="z-60 fixed items-center justify-center m-auto bg-black/90">
                <CreateTask closeCard={() => {
                    setShowCreate(false)
                }} />
                </div>
            )}

            {trashOpen && (
                <div className="z-60 fixed items-center justify-center m-auto bg-black/90">
                <DeletedTasks closeCard={() => {
                    setTrashOpen(false)
                }} columns={columns} />
                </div>
            )}
            <Toaster richColors position="bottom-center" />
        </div>
    )
}
export default HomePage;