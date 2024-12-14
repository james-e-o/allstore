'use client'
import { Calendar, Home, ClipboardList,CircleDollarSign,ShoppingBag, Inbox, Search, Settings,Plus,ShoppingCart } from "lucide-react"
import {Sidebar, SidebarContent, SidebarFooter, useSidebar, SidebarGroup, SidebarHeader,SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarMenuSubButton,SidebarMenuSub,SidebarMenuSubItem, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { DialogTitle } from "./ui/dialog"

  export const items = [
    {title: "Dashboard", url:"/dashboard", icon: Home, sub_content:[]},
    {title: "Inventory", url:"/dashboard/inventory", icon:ClipboardList, sub_content:[
      {title: "All stock", url:"/dashboard/inventory", icon: Plus},
      {title: "Add product", url:"/dashboard/inventory/add-product", icon: Plus},
      {title: "Categories", url:"/dashboard/inventory/categories", icon: ''},
    ]},
    {title: "Purchases", url:"/dashboard/purchases", icon:ShoppingBag, sub_content:[]},
    {title: "Sales", url:"/dashboard/sales", icon:CircleDollarSign, sub_content:[]},
    {title: "E shop", url:"/dashboard/e-shop", icon: ShoppingCart, sub_content:[]},
  ]

 

const AppSidebar = () => {

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return (
    <Sidebar side='left' collapsible="icon"  className='bg-gray-50' >
      {/* {isMobile && <DialogTitle/>} */}
      <div data-mobile={openMobile} className="transition-[_padding_250ms_ease-in-out_] h-full rounded-e-lg justify-between flex flex-col data-[mobile=true]:px-3 px-0 overflow-clip bg-gray-950">
      <SidebarHeader className='p-6 h-fit bg-gray-950 text-white'>
        <div className="flex justify-center items-center">
          <h1 className="font-bold font-Madetommy md:block hidden text-lg">nexShelf</h1>
        </div>
      </SidebarHeader>
      <SidebarTrigger/>
      {/* <SidebarSeparator/> */}
      <SidebarContent className='font-semibold py-9 min-h-fit flex flex-col gap-0 p-0 items-center bg-gray-950 text-white'>

            <SidebarMenu className='text-xs gap-1'>
              {items.map((item) => (
                <SidebarMenuItem className='' key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} data-mobile={openMobile} className="flex text-xs transition-[_border-radius_300ms_ease-in-out_] duration-300 data-[mobile=true]:rounded-md rounded-none  items-center">
                      {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-3"/>}
                      <span className="w-fit">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.sub_content ? <SidebarMenuSub className='border-none '>
                  {item.sub_content.map((sub,index)=>(
                      <SidebarMenuSubItem key={index} className='ml-4'>
                        <SidebarMenuSubButton asChild>
                          <Link href={sub.url} className="text-xs px-2">
                            {sub.icon && <sub.icon/>}
                            {sub.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                  ))}
                  </SidebarMenuSub>:''}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          
      </SidebarContent>
      <SidebarFooter>
              helloo
      </SidebarFooter>
      </div>
    </Sidebar>
  )
}

export default AppSidebar