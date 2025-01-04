'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
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
            <main className='flex-grow bg-core_grey1 p-1 h-full'> 
                <div className="bg-white flex flex-col overflow-y-hidden rounded-sm h-full">                    
                    <header className="bg-white rounded-md p-2 mb-1 flex w-full justify-between items-center font-Inter ">
                        <p className="font-bold px-1">All stock</p>
                        <nav className={`inline-grid w-fit mt-1 overflow-x-hidden gap-2 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit grid-cols-1`}>
                            <Link href={'/dashboard/inventory/categories/'}><button className='py-1 px-2 relative border-transparent rounded-md data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="products">Add product</button></Link>
                        </nav>
                    </header>           
                    {children}
                </div>  
            </main>
        </div>
    );
 }