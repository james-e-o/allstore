'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit,ChevronLeft,ChevronRight, } from "lucide-react";
import AppSidebar,{ items } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";



export default function DashboardLayout({ children }) {
    const path = usePathname()
    const [activeMenu, setActiveMenu] = useState('')
    let split = path.split('/')
    const commonTitle = items.map(item=>item.title.toLowerCase())

    const[sidebarActive,setSidebarActive]=useState(false)
    const [collapsible,setCollapsible]= useState(false)
    
    useEffect(()=>{
       let Heading = commonTitle.filter(value => split.includes(value))
       setActiveMenu(Heading[Heading.length-1])
    },[path]) 
   
    return (   
        <div className='flex h-full overflow-hidden'>
            <AppSidebar sidebarOpen={sidebarActive} activeMenu={activeMenu} toggleSidebar={()=>setSidebarActive(!sidebarActive)} closeSidebar={()=>setSidebarActive(false)} openSidebar={()=>setSidebarActive(true)} collapsible={collapsible} toggleDrop={()=>setCollapsible(!collapsible)} wrap={()=>setCollapsible(false)} drop={()=>setCollapsible(false)}/>
            <main className='flex-grow bg-core_grey2/80 p-2 md:px-4 py-2 h-full relative w-svw overflow-hidden'>
            <button id="mobile_trigger" data-open={sidebarActive} className='bg-green-500 z-50 pl-3 shadow-md md:hidden inline-block pr-3 py-1 right-0 bottom-16 absolute w-fit scale-90 rounded-l-full hover:bg-core_contrast/25' onClick={()=>{setSidebarActive(!sidebarActive),setCollapsible(false)}}>{sidebarActive?<ChevronLeft  className="text-white "/>:<ChevronRight className="text-white "/>}</button> 
                <div className="bg-white flex flex-col overflow-y-hidden rounded-lg h-full">                    
                    <header className=" rounded-md px-2 mb-1 text-xs flex w-full justify-between items-center font-Inter ">
                        <p className="font-bold px-1">All stock</p>
                        <nav className={`inline-grid w-fit mt-1 overflow-x-hidden gap-2 bg-blue-400 rounded-[3px] border-black h-fit grid-cols-1`}>
                            <Link href={'/dashboard/inventory/categories/'}><button className='py-1 px-2 relative border-transparent rounded-md data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="products">Add product</button></Link>
                        </nav>
                    </header>           
                    {children}
                </div>  
            </main>
        </div>
    );
 }