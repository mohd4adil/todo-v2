import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import {   
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useRestoreTask } from "@/hooks/useRestoreTask";
import { useConfirmDeleteTask } from '@/hooks/useConfirmDelete'



export const getColumns = ({ isTrash = false }) => [
    {
        accessorKey: 'task_name',
        // header: ()=> <div className="text-lg font-bold text-left p-2 text-white">Name</div>,
        header: ({ column }) => {
            return (
                <div
                className={`w-fit px-2 ${isTrash ? 'text-black' : 'text-white'} text-lg font-bold flex rounded-md items-center hover:cursor-pointer hover:ring-offset-[0.5px] hover:ring-[0.5px] ${isTrash ? 'hover:ring-black' : 'hover:ring-white'}`}
                onClick={()=> column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({row}) => {
            const taskName = row.getValue("task_name").toString()
            return <div className={`text-left font-medium p-2 ${isTrash ? 'text-black' : 'text-white'}`}>{taskName}</div>
        },
        size: 200,
    },
    {
        accessorKey: 'task_description',
        header: ({ column }) => {
            return (
                <div
                className={`w-fit px-2 ${isTrash ? 'text-black' : 'text-white'} text-lg font-bold flex rounded-md items-center hover:cursor-pointer hover:ring-offset-[0.5px] hover:ring-[0.5px] ${isTrash ? 'hover:ring-black' : 'hover:ring-white'}`} onClick={()=> column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({row}) => {
            const taskDescription = row.getValue("task_description").toString()
            return <div className={`text-left font-medium p-2 ${isTrash ? 'text-black' : 'text-white'}`}>{taskDescription}</div>
        },
        size: 450,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <div
                className={`w-fit px-2 ${isTrash ? 'text-black' : 'text-white'} text-lg font-bold flex rounded-md items-center hover:cursor-pointer hover:ring-offset-[0.5px] hover:ring-[0.5px] ${isTrash ? 'hover:ring-black' : 'hover:ring-white'}`} onClick={()=> column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({row}) => {
            const status = row.getValue("status").toString()
            return <div className={`text-left font-medium p-2 ${isTrash ? 'text-black' : 'text-white'}`}>{status}</div>
        },
        size: 150,
    },
    {
        id: 'task_id',
        cell: ({row}) => {
            const confirmDelete = useConfirmDeleteTask()
            const deleteTask = useDeleteTask()
            const restoreTask = useRestoreTask()
            const rowData = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-70" align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {isTrash ? 
                        <>
                        </>
                        :
                        <DropdownMenuItem onClick={() => 
                            {
                                navigator.clipboard.writeText(rowData.task_id)
                                toast.info('Successfully copied the text')
                            }}>
                            Copy Task ID
                        </DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        {isTrash ? 
                        <div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
                                    Delete Permanently
                            </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="z-100">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure you want to delete this task?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                           Once deleted, you will not be able to recover this task.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="text-white" onClick={()=> confirmDelete.mutate(rowData.task_id)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>

                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
                                    Restore
                            </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent  className="z-100">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure you want to restore this task?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Once restored, you will be able to access this task
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="text-white" onClick={()=> restoreTask.mutate(rowData.task_id)}>
                                            Restore
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                        </AlertDialog>
                        </div>
                        :
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
                                    Move to Trash
                            </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure you want to move this task to the trash?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Moving this to the trash bin will temporarily delete the task. You can recover it from the trash within 30 days.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="text-white" onClick={()=> deleteTask.mutate(rowData.task_id)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            }   
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 50,
    }
    ]