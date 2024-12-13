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
        <SidebarProvider className='flex bg-gray-50'>
            <AppSidebar />
            <main className='flex-grow'>              
                {children}
            </main>
        </SidebarProvider>
    );
 }