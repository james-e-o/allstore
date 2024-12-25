'use client'
import { Calendar,Users, Home, ClipboardList,CircleDollarSign,ShoppingBag, Inbox, Search, Settings,Plus,ShoppingCart } from "lucide-react"
import {Sidebar, SidebarContent, SidebarFooter, useSidebar, SidebarGroup, SidebarHeader,SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarMenuSubButton,SidebarMenuSub,SidebarMenuSubItem, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { DialogTitle } from "./ui/dialog"
import { useState,useEffect } from "react"
import { Button } from "./ui/button"
import { Collapsible } from "@radix-ui/react-collapsible"

  export const items = [
    {title: "Dashboard", url:"/dashboard", icon: Home, sub_content:''},
    {title: "Inventory", url:"/dashboard/inventory", icon:ClipboardList, sub_content:[
      {title: "All stock", url:"/dashboard/inventory", icon: Plus},
      {title: "Add product", url:"/dashboard/inventory/add-product", icon: Plus},
      {title: "Categories", url:"/dashboard/inventory/categories/", icon: ''},
    ]},
    {title: "Purchases", url:"/dashboard/purchases", icon:ShoppingBag, sub_content:''},
    {title: "Sales", url:"/dashboard/sales", icon:CircleDollarSign, sub_content:''},
    {title: "E shop", url:"/dashboard/e-shop", icon: ShoppingCart, sub_content:''},
    {title: "Staff", url:"/dashboard/staff", icon: Users, sub_content:''},
  ]

 

const AppSidebar = ({sidebarOpen,toggleSidebar,closeSidebar,openSidebar}) => {

  const [activeMenu,setActiveMenu]= useState(items[0].title)
  const [collapsible,setCollapsible]= useState(false)
  useEffect(()=>{
    const sideBar = document.getElementById('sidebar')
    document.onpointerdown =(e)=> {
      if(sidebarOpen&&e.target.closest('div#sidebar'))return
      else  if(sidebarOpen){closeSidebar(),setCollapsible(false)}
    }
  }) 

  return (
    <div id="sidebar" className=" z-30 w-[2.75rem] p-0 relative">
      <div data-open={sidebarOpen} className={`flex flex-col justify-between p-0 relative transition-all ease-out duration-200 data-[open=true]:ease-in-out data-[open=true]:duration-300 overflow-x-hidden bg-gray-800 h-full ${sidebarOpen ? "w-[65svw]" : "w-[2.75rem] "}`}>
        <SidebarHeader className={`p-6 h-fit  text-white ${sidebarOpen ? " " : "w-[2.75rem]"}`}>
          <div className="flex justify-center items-center">
            <h1 className="font-bold font-Madetommy md:block hidden text-lg">nexShelf</h1>
          </div>
        </SidebarHeader>
        
        <div data-open={sidebarOpen} className="flex-grow py-8 data-[open=true]:px-3 px-0 flex flex-col justify-start liststyle-none transition-all duration-300 data-[openn=true]:duration-100 ease-in-out">
          <Button onClick={toggleSidebar}>trig</Button>
        
          <SidebarMenu className='text-xs flex flex-col gap-6'>
          {items.map((item,index) => (
                <SidebarMenuItem className='flex-grow' key={item.title}>
                 {item.sub_content==''? <Link href={item.url}>
                    <Button data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?setCollapsible(!collapsible):item.sub_content==''?setCollapsible(false):'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen?(closeSidebar(),setCollapsible(false)):"",console.log(activeMenu,collapsible)}}  className='w-full text-white hover:bg-white relative border-none shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'>
                      <span className=" flex text-sm w-full border-none font-semibold items-center">
                        {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-4 scale-125"/>}
                        <span className="w-fit">{item.title}</span>
                      </span>
                    </Button>
                  </Link>
                  :
                  <Button data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?setCollapsible(!collapsible):item.sub_content==''?setCollapsible(false):'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen?(closeSidebar(),setCollapsible(false)):"",console.log(activeMenu,collapsible)}}  className='w-full text-white hover:bg-white relative border-none shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'>
                    <span className=" flex text-sm w-full border-none font-semibold items-center">
                      {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-4 scale-125"/>}
                      <span className="w-fit">{item.title}</span>
                    </span>
                </Button>
                  }
                  {item.sub_content ? <div className={`grid transition-all ease-out duration-200 border-none transition-collapse ${item.title==activeMenu&&collapsible? "grid-rows-[1fr]" : " grid-rows-[0fr] "}`}><SidebarMenuSub className={`border-none overflow-hidden`}>
                  {item.sub_content.map((sub,index)=>(
                      <SidebarMenuSubItem key={index} className='ml-5 flex-grow '>
                        <Link href={sub.url}>
                          <Button variant={'ghost'} className='relative border-none shadow-none outline-none hover:text-black text-white hover:bg-white'>
                            <span className="text-xs flex px-2 font-semibold items-center">
                              {/* {sub.icon && <sub.icon/>} */}
                              <span className="w-fit">{sub.title}</span>
                            </span>
                          </Button>
                        </Link>
                      </SidebarMenuSubItem>
                  ))}
                  </SidebarMenuSub>
                  </div> 
                  :''}
                </SidebarMenuItem>
              ))}
              </SidebarMenu>
        </div>
        <SidebarFooter className='bg-yellow-500 min-h-8'>
          <div className="p-1"></div>
        </SidebarFooter>
      </div>
    </div>
  )
}

export default AppSidebar