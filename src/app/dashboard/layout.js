'use client'
import { useEffect, useState} from "react";
import Link from "next/link";
import {ChevronLeft,ChevronRight } from "lucide-react";
import {  Drawer} from "@/components/ui/drawer";
import AppSidebar,{ items } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import HeaderValue from "@/components/head-value";
import DashboardHeader from "@/components/dashboard-header";





export default function DashboardLayout({ children }) {
    const path = usePathname()
    const [activeMenu, setActiveMenu] = useState('')
    const [headerContext, setHeaderContext] = useState('')
    let split = path.split('/')
    const commonTitle = items.map(item=>item.title.toLowerCase())

    const[sidebarActive,setSidebarActive]=useState(true)
    const [collapsible,setCollapsible]= useState(false)
    
    useEffect(()=>{
       let Heading = commonTitle.filter(value => split.includes(value))
       setActiveMenu(Heading[Heading.length-1])
    },[path]) 
    useEffect(()=>{
       if(!window.innerWidth>=768)setSidebarActive(false)
    },[]) 
   
    return ( 
        <HeaderValue>    
        <div className='flex h-full overflow-hidden'>
            <Drawer>
            <AppSidebar sidebarOpen={sidebarActive} activeMenu={activeMenu} toggleSidebar={()=>setSidebarActive(!sidebarActive)} closeSidebar={()=>setSidebarActive(false)} openSidebar={()=>setSidebarActive(true)} collapsible={collapsible} toggleDrop={()=>setCollapsible(!collapsible)} wrap={()=>setCollapsible(false)} drop={()=>setCollapsible(false)}/>
            <main className='flex-grow bg-core_grey2/80 p-2 md:px-4 py-2 h-full relative w-svw overflow-hidden'>
            <button id="mobile_trigger" data-open={sidebarActive} className='bg-green-500 z-50 pl-3 shadow-md md:hidden inline-block pr-4 py-3 right-0 bottom-16 absolute w-fit scale-90 rounded-l-full hover:bg-core_contrast/25' onClick={()=>{setSidebarActive(!sidebarActive),setCollapsible(false)}}>{sidebarActive?<ChevronLeft  className="text-white "/>:<ChevronRight className="text-white "/>}</button> 
                <div className="bg-white flex flex-col overflow-y-hidden rounded-lg h-full">                    
                    <DashboardHeader />   
                    <div className="px-3">
                        <Separator className='mt-[6px]' />
                    </div>
                    {children}
                </div>  
            </main>
            </Drawer>
        </div>
        </HeaderValue>
    );
 }