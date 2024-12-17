'use client'
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar,{ items } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";



export default function DashboardLayout({ children }) {
    const path = usePathname()
    const [activeMenu, setActiveMenu] = useState('')
    let split = path.split('/')
    const commonTitle = items.map(item=>item.title.toLowerCase())

    const[sidebarActive,setSidebarActive]=useState(false)
    
    useEffect(()=>{
       let Heading = commonTitle.filter(value => split.includes(value))
       setActiveMenu(Heading[Heading.length-1])
    },[path]) 
   
    return (   
        <div className='flex bg-gray-50 h-full overflow-hidden'>
            <AppSidebar sidebarOpen={sidebarActive} activeMenu={activeMenu} toggleSidebar={()=>setSidebarActive(!sidebarActive)} closeSidebar={()=>setSidebarActive(false)} openSidebar={()=>setSidebarActive(true)}/>
            <main className='flex-grow h-svh'>              
            {children}
            </main>
        </div>
    );
 }