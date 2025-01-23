'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit,ChevronLeft,ChevronRight, Bell,MoreHorizontal, MessageSquare, } from "lucide-react";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {  Drawer,DrawerPortal,DrawerOverlay,DrawerTrigger,DrawerClose,DrawerContent,DrawerHeader,DrawerFooter,DrawerTitle,DrawerDescription, } from "@/components/ui/drawer";
import { Avatar,  AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AppSidebar,{ items } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Image from "next/image"

import DefaultUser from '../../../public/dummy.jpg'



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
    useEffect(()=>{
       if(window.innerWidth>=768)setSidebarActive(true)
    },[]) 
   
    return (   
        <div className='flex h-full overflow-hidden'>
            <Drawer>
            <AppSidebar sidebarOpen={sidebarActive} activeMenu={activeMenu} toggleSidebar={()=>setSidebarActive(!sidebarActive)} closeSidebar={()=>setSidebarActive(false)} openSidebar={()=>setSidebarActive(true)} collapsible={collapsible} toggleDrop={()=>setCollapsible(!collapsible)} wrap={()=>setCollapsible(false)} drop={()=>setCollapsible(false)}/>
            <main className='flex-grow bg-core_grey2/80 p-2 md:px-4 py-2 h-full relative w-svw overflow-hidden'>
            <button id="mobile_trigger" data-open={sidebarActive} className='bg-green-500 z-50 pl-3 shadow-md md:hidden inline-block pr-4 py-3 right-0 bottom-16 absolute w-fit scale-90 rounded-l-full hover:bg-core_contrast/25' onClick={()=>{setSidebarActive(!sidebarActive),setCollapsible(false)}}>{sidebarActive?<ChevronLeft  className="text-white "/>:<ChevronRight className="text-white "/>}</button> 
                <div className="bg-white flex flex-col overflow-y-hidden rounded-lg h-full">                    
                    <header className=" rounded-md px-3 pt-2  text-xs flex w-full justify-end items-center font-Inter ">
                        <div className="flex gap-2 items-center">
                            <div className="p-1">
                                <MessageSquare className="p-1" />
                            </div>
                            <div className="p-1">
                                <Bell className="p-1" />
                            </div>
                            <DropdownMenu className="text-right hidden md:block">
                                <DropdownMenuTrigger asChild>
                                    <div className="md:flex scale-90 hidden gap-2 items-center">
                                        <Avatar className='items-center inline-flex rounded-full w-7 h-7 justify-center'>
                                            <Image src={DefaultUser} className=" w-full " alt="@storeprobuilder"/>
                                            {/* <AvatarFallback>JO</AvatarFallback> */}
                                        </Avatar>
                                        <div className="flex-col leading-tight flex">
                                            <p className="text-[11px] font-semibold">Staff full name</p>
                                            <p className="text-[10px] italic font-semibold text-core_contrast/50">Staff role</p>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(payment.id)}
                                        >
                                        Copy payment ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>View customer</DropdownMenuItem>
                                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DrawerTrigger className="md:hidden">
                                <div className="flex md:hidden gap-2 items-center px-2">
                                    <Avatar className='items-center inline-flex rounded-full w-7 h-7 justify-center'>
                                        <Image src={DefaultUser} className=" w-full " alt="@storeprobuilder"/>
                                        {/* <AvatarFallback>JO</AvatarFallback> */}
                                    </Avatar>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent className="md:hidden">
                                <DrawerTitle></DrawerTitle>
                                <div className="flex-col gap-[2px] flex">
                                    <p className="text-sm font-semibold">Staff full name</p>
                                    <p className="text-sm italic font-semibold text-core_contrast/50">Staff role</p>
                                </div>
                            </DrawerContent>
                        </div>
                    </header>           
                    {children}
                </div>  
            </main>
            </Drawer>
        </div>
    );
 }