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
    <Sidebar side='left' collapsible="icon"  className='bg-gray-100' >
      {/* {isMobile && <DialogTitle/>} */}
      <div className=" h-full rounded-2xl overflow-clip bg-gray-950">
      <SidebarHeader className='p-6 h-fit bg-gray-950 text-white'>
        <div className="flex justify-center items-center">
          <h1 className="font-bold font-Madetommy text-lg">nexShelf</h1>
        </div>
      </SidebarHeader>
      <SidebarTrigger/>
      {/* <SidebarSeparator/> */}
      <SidebarContent className='px-2 font-semibold py-9 flex flex-col items-center bg-gray-950 text-white'>

            <SidebarMenu className='gap-1'>
              {items.map((item) => (
                <SidebarMenuItem className='mt-1' key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="text-[0.8125rem] px-4">
                      {item.icon && <item.icon/>}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.sub_content ? <SidebarMenuSub className='border-none'>
                  {item.sub_content.map((sub,index)=>(
                      <SidebarMenuSubItem key={index}>
                        <SidebarMenuSubButton asChild>
                          <Link href={sub.url} className="text-[0.8125rem] px-2">
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
      <SidebarSeparator/>
      <SidebarFooter>
              helloo
      </SidebarFooter>
      </div>
    </Sidebar>
  )
}

export default AppSidebar