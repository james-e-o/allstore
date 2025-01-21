'use client'
import { Calendar,Users, Home,ChevronLeft,ChevronRight, ClipboardList,CircleDollarSign,ShoppingBag, Inbox, Search, Settings,Plus,ShoppingCart } from "lucide-react"
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
      {title: "Products", url:"/dashboard/inventory/products/", icon: Plus},
      {title: "Categories", url:"/dashboard/inventory/categories/", icon: ''},
    ]},
    {title: "Purchases", url:"/dashboard/purchases", icon:ShoppingBag, sub_content:''},
    {title: "Sales", url:"/dashboard/sales", icon:CircleDollarSign, sub_content:''},
    {title: "E shop", url:"/dashboard/e-shop", icon: ShoppingCart, sub_content:''},
    {title: "Staff", url:"/dashboard/staff", icon: Users, sub_content:''},
  ]

 

const AppSidebar = ({sidebarOpen,toggleSidebar,closeSidebar,openSidebar,collapsible,toggleDrop,drop,wrap}) => {

  const [innerWidth, setInnerWidth] = useState('')
  const [activeMenu,setActiveMenu]= useState(items[0].title)
  
 
  useEffect(()=>{
    setInnerWidth(window.innerWidth>=768)
    const mobile_trigger = document.getElementById('mobile_trigger')
    document.onpointerdown =(e)=> {      
      if(sidebarOpen&&e.target.closest('div#sidebar'))return
      else  if(sidebarOpen&&e.target.closest('button#mobile_trigger'))return
      if(sidebarOpen&&innerWidth)return
      else  if(sidebarOpen&&!innerWidth&&!e.target.closest('button#mobile_trigger')){closeSidebar(),wrap()}
    }
  }) 

  useEffect(()=>{
    window.onresize = () => {
      setInnerWidth(window.innerWidth>=768)
    }
  },[])

  return (
    <div id="sidebar" className={`z-30 md:w-fit w-0 p-0 relative`}>
      <div data-open={sidebarOpen} className={`flex flex-col justify-between p-0 relative transition-all ease-out duration-200 data-[open=true]:ease-in-out data-[open=true]:duration-300 bg-core_polish h-full ${sidebarOpen ? "w-[60svw] sm:w-[35svw] md:w-48" : "w-0 md:w-[2.75rem] "}`}>
        <SidebarHeader className={`p-6 h-fit overflow-x-hidden text-white ${sidebarOpen ? " " : "w-[2.7rem]"}`}>
          <div className="flex justify-center items-center">
            <h1 className="font-bold font-Madetommy md:block hidden text-lg">nexShelf</h1>
          </div>
        </SidebarHeader>
        <button data-open={sidebarOpen} className='bg-green-500 z-50 pl-1 hidden md:inline-block pr-2 py-[2px] left-[98%] absolute w-fit scale-90 top-10  rounded-r-full hover:bg-core_contrast/25' onClick={()=>{toggleSidebar(),wrap()}}>{sidebarOpen?<ChevronLeft  className="text-white "/>:<ChevronRight className="text-white "/>}</button>
        
        <div data-open={sidebarOpen} className="flex-grow py-8 data-[open=true]:px-3 px-0 flex flex-col justify-start liststyle-none transition-all duration-300 overflow-x-hidden data-[openn=true]:duration-100 ease-in-out">
        
          <SidebarMenu className='text-xs flex flex-col gap-4 md:gap-2'>
          {items.map((item,index) => (
                <SidebarMenuItem className='flex-grow' key={item.title}>
                 {item.sub_content==''? <Link href={item.url}>
                    <Button size='sm' data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?toggleDrop():item.sub_content==''?wrap():'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen&&!innerWidth?(closeSidebar(),wrap()):"",console.log(activeMenu,collapsible)}}  className='w-full text-white hover:bg-white relative border-none shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'>
                      <span className=" flex md:text-xs text-sm w-full border-none items-center">
                        {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-5 ml-[3px] scale-105"/>}
                        <span className="w-fit ">{item.title}</span>
                      </span>
                    </Button>
                  </Link>
                  :
                  <Button size='sm' data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?toggleDrop():item.sub_content==''?wrap():'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen&&!innerWidth?(closeSidebar(),wrap()):"",console.log(activeMenu,collapsible)}}  className='w-full text-white hover:bg-white relative border-none shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'>
                    <span className=" flex md:text-xs text-sm w-full border-none items-center">
                      {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-5 ml-[3px] scale-105"/>}
                      <span className="w-fit">{item.title}</span>
                    </span>
                </Button>
                  }
                  {item.sub_content ? <div className={`grid transition-all ease-out duration-200 border-none transition-collapse ${item.title==activeMenu&&collapsible? "grid-rows-[1fr]" : " grid-rows-[0fr] "}`}><SidebarMenuSub data-margin={collapsible} className={`border-none overflow-hidden data-[margin=true]:mt-2 transition-all duration-500 ml-8 mr-0 items-start`}>
                  {item.sub_content.map((sub,index)=>(
                      <SidebarMenuSubItem key={index} className='w-full'>
                        <Link href={sub.url}>
                          <Button size='sm' onClick={()=>{innerWidth?"":(closeSidebar(),wrap())}} variant={'ghost'} className='relative w-full justify-start border-none shadow-none outline-none hover:text-black text-white hover:bg-white'>
                            <span className="text-xs flex justify-start text-start px-2 ">
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
        <SidebarFooter className=' min-h-6'>
          <div className="p-1"></div>
        </SidebarFooter>
      </div>
    </div>
  )
}

export default AppSidebar