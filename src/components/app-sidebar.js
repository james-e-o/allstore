'use client'
import { Calendar, Home, ClipboardList,CircleDollarSign,ShoppingBag, Inbox, Search, Settings,Plus,ShoppingCart } from "lucide-react"
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
      {title: "Categories", url:"/dashboard/inventory/categories", icon: ''},
    ]},
    {title: "Purchases", url:"/dashboard/purchases", icon:ShoppingBag, sub_content:''},
    {title: "Sales", url:"/dashboard/sales", icon:CircleDollarSign, sub_content:''},
    {title: "E shop", url:"/dashboard/e-shop", icon: ShoppingCart, sub_content:''},
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
                <SidebarMenuItem className='flex-grow z-20' key={item.title}>
                  <Button data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?setCollapsible(!collapsible):item.sub_content==''?setCollapsible(false):'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen?(closeSidebar(),setCollapsible(false)):"",console.log(activeMenu,collapsible)}}  className='w-full text-white hover:bg-white relative border-none shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'>
                    <Link href={item.url} className=" flex text-base w-full border-none font-semibold items-center">
                      {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-4 scale-[1.35]"/>}
                      <span className="w-fit">{item.title}</span>
                    </Link>
                  </Button>
                  {item.sub_content ? <div className={`grid transition-all ease-out duration-200 border-none transition-collapse ${item.title==activeMenu&&collapsible? "grid-rows-[1fr]" : " grid-rows-[0fr] "}`}><SidebarMenuSub className={`border-none overflow-hidden`}>
                  {item.sub_content.map((sub,index)=>(
                      <SidebarMenuSubItem key={index} className='ml-5 flex-grow '>
                        <Button variant={'ghost'} className=''>
                          <Link href={sub.url} className="text-xs flex px-2">
                            {sub.icon && <sub.icon/>}
                            {sub.title}
                          </Link>
                        </Button>
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
    // <Sidebar side='left' collapsible="icon"  className='bg-gray-50' >
    //   {/* {isMobile && <DialogTitle/>} */}
    //   <div data-mobile={openMobile} className="transition-[_padding_250ms_ease-in-out_] h-full rounded-e-lg justify-between flex flex-col data-[mobile=true]:px-3 px-0 overflow-clip bg-gray-950">
    //   <SidebarHeader className='p-6 h-fit bg-gray-950 text-white'>
    //     <div className="flex justify-center items-center">
    //       <h1 className="font-bold font-Madetommy md:block hidden text-lg">nexShelf</h1>
    //     </div>
    //   </SidebarHeader>
    //   <SidebarTrigger/>
    //   {/* <SidebarSeparator/> */}
    //   <SidebarContent className='font-semibold py-9 min-h-fit flex flex-col gap-0 p-0 items-center bg-gray-950 text-white'>

    //         <SidebarMenu className='text-xs gap-1'>
    //           {items.map((item) => (
    //             <SidebarMenuItem className='' key={item.title}>
    //               <SidebarMenuButton asChild>
    //                 <Link href={item.url} data-mobile={openMobile} className="flex text-xs transition-[_border-radius_300ms_ease-in-out_] duration-300 data-[mobile=true]:rounded-md rounded-none  items-center">
    //                   {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-3"/>}
    //                   <span className="w-fit">{item.title}</span>
    //                 </Link>
    //               </SidebarMenuButton>
    //               {item.sub_content ? <SidebarMenuSub className='border-none '>
    //               {item.sub_content.map((sub,index)=>(
    //                   <SidebarMenuSubItem key={index} className='ml-4'>
    //                     <SidebarMenuSubButton asChild>
    //                       <Link href={sub.url} className="text-xs px-2">
    //                         {sub.icon && <sub.icon/>}
    //                         {sub.title}
    //                       </Link>
    //                     </SidebarMenuSubButton>
    //                   </SidebarMenuSubItem>
    //               ))}
    //               </SidebarMenuSub>:''}
    //             </SidebarMenuItem>
    //           ))}
    //         </SidebarMenu>
          
    //   </SidebarContent>
    //   <SidebarFooter>
    //           helloo
    //   </SidebarFooter>
    //   </div>
    // </Sidebar>
  )
}

export default AppSidebar