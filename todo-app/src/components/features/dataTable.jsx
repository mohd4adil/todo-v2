import { 
    flexRender, 
    useReactTable, 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { CirclePlus, Trash2, BrushCleaning } from 'lucide-react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useEmptyTrash } from "@/hooks/useEmptyTrash";

export const DataTable = ({ columns, data, setSelectedTaskId, onCreate, onOpenTrash, trashView = false }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8
    })
    const emptyTrash = useEmptyTrash()
    
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setIsVisible(true)
        }, 50)
        return () => clearTimeout(timer)
    })

    useEffect(() => {
        if (trashView) setPagination({
            pageIndex: 0,                            
            pageSize: 4
                                    })
    }, [trashView])
    
    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        enableColumnResizing: true,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination,
            sorting,
            columnFilters
        }
        })

    return ( 
        <div className={`${trashView ? 'bg-white' : 'bg-black'} border border-white p-5 rounded-md space-y-4`}>
            <div className="flex py-4 items-center space-x-4 justify-center">

                <Input 
                placeholder="Search task"
                value={(table.getColumn('task_name')?.getFilterValue()) ?? ""}
                onChange={(e) => {
                    table.getColumn('task_name')?.setFilterValue(e.target.value)
                }}
                className={`max-w-sm ${ trashView ? 'text-black' : 'text-white'}`}
                >
                </Input>
                {trashView ?
                <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button>
                            <BrushCleaning /> Delete All
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="z-60">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete All Tasks</AlertDialogTitle>
                            <AlertDialogDescription>
                                Do you really want to delete all the tasks? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => emptyTrash.mutate()}>Delete All</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                :
                <>
                <Button onClick={onCreate}>
                        <CirclePlus />
                        Create Task
                </Button>
                <HoverCard>
                    <HoverCardTrigger asChild>
                    <Button onClick={onOpenTrash}>
                            <Trash2 />
                    </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#262626] border-none">
                        <div className="h-fit w-fit p-4 text-sm text-white">
                        View all of your deleted tasks here
                        </div>
                    </HoverCardContent>
                </HoverCard>
                </>
                }
            </div>
        <div className="overflow-y-scroll rounded-md border bg-black max-h-[50%]">
            <Table className={`transition-all ease-in-out duration-200 ${isVisible === true ? 'opactiy-100' : 'opacity:30'}`}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} onClick={()=>{
                            console.log('header clicked')
                        }}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className={`${trashView ? 'bg-white text-black' : ''}`}
                                        key={header.id}
                                        style={{ width: header.getSize() }} // Apply the defined size
                                    >
                                        {header.isPlaceholder? 
                                        null
                                        :
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                        }
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow className={`${trashView ? 'bg-white' : ''}`} onClick={() => {
                                setSelectedTaskId(row.original.task_id)
                            }} key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )
                    :
                    (
                        <TableRow>
                            <TableCell colSpan={columns.length} className={`h-24 text-center ${trashView ? ' bg-white text-black' : 'text-white'} `}>
                                No results.
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
            </Table>
        </div>
        <div className="flex flex-row justify-between items-center">
            <Button variant={`${trashView ? 'default': ''}`} onClick={()=> table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
            </Button>
            <Button variant={`${trashView ? 'default': ''}`} onClick={()=> table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
            </Button>
        </div>
        </div>

    )
}