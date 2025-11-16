import { Sidebar } from "@/components/features/appSidebar"
import { Button } from "@/components/ui/button"
import { Bubbles } from "lucide-react"
import { useFetchTasks } from "@/hooks/useFetchTasks"
import { useSidebar } from "@/context/SidebarContext"


// function MainContent({ children }) {
//   const { state, toggleSidebar } = useSidebar()
//   const mainClass = state === "expanded" ? "flex flex-col w-full md:ml-[116px] transition-all duration-200 ease-linear md:w-[95vw]" : "flex flex-col w-full md:ml-[50px] transition-all duration-200  ease-linear md:w-[97vw]"
//   console.log('state value: ', state)
//   return (
//     <main className={`${mainClass}`}>
//       <header className="flex bg-black rounded-sm h-7 w-[100%] sticky top-0 ">
//         <Button className="w-6 h-6 ml-[0] rounded-none flex-start" variant="destructive" onClick={()=>toggleSidebar()}><PanelLeft/></Button>
//       </header>
//       {children}
//     </main>
//   )
// }

export default function Layout({ children }) {

  // const { isLoading } = useFetchTasks()
  const { sidebarState } = useSidebar()

  const mainClass = sidebarState === "expanded"
  ? "flex-1 transition-all duration-300"
  : "flex-1 transition-all duration-300"

  // if (isLoading) {
  //     <div className="flex flex-row overflow-x-hidden">
  //       <div className="bg-transparent w-screen flex flex-col items-center">
  //         <Bubbles className="h-8 w-8 animate-spin mb-2 color-[#262626]" />
  //         Loadingg...
  //       </div>
  //     </div>
  // }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className={`${mainClass} overflow-auto`}>
        {children}
      </main>
    </div>
  )
}