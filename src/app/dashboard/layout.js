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
    
    useEffect(()=>{
       let Heading = commonTitle.filter(value => split.includes(value))
       setActiveMenu(Heading[Heading.length-1])
    },[path])  
    return (   
        <SidebarProvider className='flex bg-gray-100'>
            <AppSidebar />
            <main className='flex-grow'>
                <div className="h-full flex flex-col bg-gray-100 w-full">
                    <header className="p-4 font-Voces ">
                        {/* <SidebarTrigger/> */}
                        <p className="font-bold">{activeMenu.toUpperCase()}</p>
                        <p className="mt-[1px] text-gray-300 text-xs">{path}</p>
                    </header>
                    <Separator/>
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
 }