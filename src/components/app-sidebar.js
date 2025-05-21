'use client'
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { Calendar,Users, Home,ChevronLeft,ChevronRight, ClipboardList,CircleDollarSign,ShoppingBag,ChartLine,Plus,ShoppingCart, NotebookPen, Truck, Minus,Store, Settings, Undo2, X } from "lucide-react"
import {Sidebar, SidebarContent, SidebarFooter, useSidebar, SidebarGroup, SidebarHeader,SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarMenuSubButton,SidebarMenuSub,SidebarMenuSubItem, SidebarTrigger } from "@/components/ui/sidebar"
import InputBox from "./input-box"
import { AlertDialog, AlertDialogAction, AlertDialogCancel,AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { Avatar,  AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DialogTitle } from "./ui/dialog"
import { useState,useEffect } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Collapsible } from "@radix-ui/react-collapsible"
import profilePix from '../../public/dummy.jpg'

  export const items = [
    {title: "Dashboard", url:"/dashboard", icon: Home, sub_content:''},
    {title: "Analytics", url:"/analytics", icon: ChartLine, sub_content:''},
    {title: "Inventory", url:"/dashboard/inventory", icon:ClipboardList, sub_content:[
      {title: "All stock", url:"/dashboard/inventory", icon: Minus},
      {title: "Products", url:"/dashboard/inventory/products/", icon: Minus},
      {title: "Categories", url:"/dashboard/inventory/categories/", icon: Minus},
    ]},
    {title: "Purchases", url:"/dashboard/purchases", icon:ShoppingBag, sub_content:''},
    {title: "Sales", url:"/dashboard/sales", icon:CircleDollarSign, sub_content:''},
    {title: "Accounts", url:"/dashboard/accounts", icon:NotebookPen, sub_content:''},
    {title: "E shop", url:"/dashboard/e-shop", icon: ShoppingCart, sub_content:''},
    {title: "Staff", url:"/dashboard/staff", icon: Users, sub_content:''},
    {title: "Logistics", url:"/dashboard/logistics", icon: Truck, sub_content:''},
  ]

 

const AppSidebar = ({sidebarOpen,toggleSidebar,closeSidebar,openSidebar,collapsible,toggleDrop,drop,wrap}) => {

  // UI
  const [innerWidth, setInnerWidth] = useState('')
  const [activeMenu,setActiveMenu]= useState(items[0].title)
  const [carousel,setCarousel]=useState(false)
  const [customDialog,setCustomDialog] =useState(false)
  
  useEffect(()=>{
    window.innerWidth<768?closeSidebar():openSidebar()
  },[])
  useEffect(()=>{
    setInnerWidth(window.innerWidth>=768)
    document.onpointerdown =(e)=> {      
      if(sidebarOpen&&e.target.closest('div#sidebar'))return
      else  if(sidebarOpen&&e.target.closest('button#mobile_trigger'))return
      if(sidebarOpen&&innerWidth)return
      else  if(sidebarOpen&&!innerWidth&&!e.target.closest('button#mobile_trigger')){closeSidebar(),wrap()}
    }
    // document.removeEventListener('load',(ev)=>{})
  }) 

  useEffect(()=>{
    window.onresize = () => {
      setInnerWidth(window.innerWidth>=768)
    }
  },[])

  useEffect(()=>{
     if(innerWidth)openSidebar()
  },[])

  return (
    <div id="sidebar" className={`z-[100] md:w-fit border-r w-0 p-0 relative`}>
      <div data-open={sidebarOpen} className={`flex flex-col justify-between p-0 relative transition-all ease-out duration-200 data-[open=true]:ease-in-out data-[open=true]:duration-300 bg-blue-200 h-full ${sidebarOpen ? "w-[60svw] sm:w-[35svw] md:w-48" : "w-0 md:w-[2.75rem] "}`}>
        <SidebarHeader className={`p-6 h-fit overflow-hidden ${sidebarOpen ? " " : "w-[2.7rem]"}`}>
          <div className="flex justify-center items-center">
            <h1 className="font-bold font-Madetommy md:block hidden text-lg">nexShelf</h1>
          </div>
        </SidebarHeader>
        <button data-open={sidebarOpen} className='bg-orange-300 z-50 hidden md:inline-block pr-6px py-0 left-[98.7%] absolute w-fit scale-[0.88] top-9  rounded-r-full hover:bg-core_contrast/25' onClick={()=>{setCarousel(false),toggleSidebar(),wrap()}}>{sidebarOpen?<ChevronLeft  className="text-white "/>:<ChevronRight className="text-white "/>}</button>
        
        <div className="flex-grow overflow-x-hidden ">
          <div data-carousel={carousel} className="w-[200%] flex rounded-md data-[carousel=true]:right-full h-full right-0  duration-200 transition-[right_160ms_ease-in-out] relative ">
            <div className="flex h-full px-0 w-1/2 justify-center">
              <section data-open={sidebarOpen} className="h-fit w-full pt-4 data-[open=true]:px-3 px-0 flex  justify-start liststyle-none transition-all duration-300 overflow-x-hidden data-[openn=true]:duration-100 ease-in-out">
                <SidebarMenu className=' flex justify-start flex-col gap-3 md:gap-1'>
                {items.map((item,index) => (
                  <SidebarMenuItem className='flex-grow' key={item.title}>
                  {item.sub_content==''? <Link href={item.url}>
                      <Button size='xs' data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?toggleDrop():item.sub_content==''?wrap():'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen&&!innerWidth?(closeSidebar(),wrap()):"",console.log(activeMenu,collapsible)}}  className='w-full text-core_contrast hover:bg-white relative border-none data-[active=true]:border shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'> 
                        <span className=" flex w-full border-none items-center"> 
                          {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-5 md:scale-90 ml-[3px]"/>}
                          <span className="w-fit font-semibold ">{item.title}</span>
                        </span>
                      </Button>
                    </Link>
                    :
                    <Button size='xs' data-mobile={sidebarOpen} data-active={item.title==activeMenu} variant={'ghost'} onClick={()=>{setActiveMenu(item.title),!sidebarOpen&&item.sub_content!=''?openSidebar():"",item.sub_content!=''?toggleDrop():item.sub_content==''?wrap():'',sidebarOpen&&item.sub_content!=''?"":sidebarOpen&&!innerWidth?(closeSidebar(),wrap()):"",console.log(activeMenu,collapsible)}}  className='w-full text-core_contrast hover:bg-white relative border-none data-[active=true]:border shadow-none outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 duration-200 data-[mobile=true]:rounded-md rounded-none'>
                      <span className=" flex w-full border-none items-center">
                        {item.icon && <item.icon onClick={(e)=>{item.sub_content ?toggleSidebar():""}} className="mr-5 md:scale-90 ml-[3px]"/>}
                        <span className="w-fit font-semibold">{item.title}</span>
                      </span>
                  </Button>
                    }
                    {item.sub_content ? <div className={`grid transition-all ease-out duration-200 border-none transition-collapse ${item.title==activeMenu&&collapsible? "grid-rows-[1fr]" : " grid-rows-[0fr] "}`}><SidebarMenuSub data-margin={collapsible} className={`border-none overflow-hidden gap-0 transition-all duration-500 ml-8 mr-0 items-start`}>
                    {item.sub_content.map((sub,index)=>(
                        <SidebarMenuSubItem key={index} className='w-full first:mt-1'>
                          <Link href={sub.url}>
                            <button size='sm' onClick={()=>{innerWidth?"":(closeSidebar(),wrap())}} variant={'ghost'} className='relative w-full justify-start border-none shadow-none outline-none hover:text-black px-2px py-3px rounded-md text-core_contrast hover:bg-white'>
                              <span className=" flex justify-start gap-1 items-center text-start px-1 ">
                                {sub.icon && <sub.icon className='p-1 h-5 w-5'/>}
                                <span className="w-fit font-semibold">{sub.title}</span>
                              </span>
                            </button>
                          </Link>
                        </SidebarMenuSubItem>
                    ))}
                    </SidebarMenuSub>
                    </div> 
                    :''}
                  </SidebarMenuItem>
                ))}
                </SidebarMenu>
              </section>
            </div>
            <div className="flex h-full px-0 w-1/2 justify-center">
              <section className="flex-col h-fit w-full p-3">
                <Button variant='ghost' className='relative -mt-2 px-1 font-bold h-6 ' onClick={()=>setCarousel(false)}><Undo2/></Button>
                <h4 className="font-medium mt-1 text-sm">Settings</h4>
              </section>
            </div>
          </div>
        </div>
        <SidebarFooter data-open={sidebarOpen} className=' min-h-6 transition-all duration-300 data-[open=true]:px-3 px-0'>
            <Button size='xs' data-mobile={sidebarOpen} variant={'ghost'}  className='w-full overflow-y-clip text-core_contrast data-[mobile=false]:hover:bg-transparent relative border-none data-[active=true]:border data-[mobile=false]:hover:shadow-none shadow-none outline-none hover:bg-transparent hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 flex justify-start overflow-x-hidden duration-200 px-2 py-1 h-fit data-[mobile=true]:rounded-md rounded-none'>
                    <Avatar data-mobile={sidebarOpen} onClick={()=>{setCarousel(!carousel),openSidebar()}} className='items-center data-[mobile=false]:hover:shadow-md hover:bg-[#e7e7e7] border-none data-[mobile=true]:mr-4 mr-1 transition-all duration-300 h-8 w-8 inline-flex rounded-2xl justify-center'>
                        <AvatarFallback className='bg-white'><Settings/></AvatarFallback>
                    </Avatar>
            </Button>
            <div className=''>
              {/* <AlertDialogTrigger asChild> */}
              <Link href="/dashboard/store">

                <Button size='xs' data-mobile={sidebarOpen} variant={'ghost'}  className='w-full overflow-y-clip text-core_contrast data-[mobile=false]:border-none data-[mobile=false]:shadow-none hover:bg-[#f7f7f7] data-[mobile=false]:hover:bg-transparent relative border-t hover:data-[mobile=false]:shadow-none shadow-md outline-none hover:text-black transition-all ease-in-out data-[mobile=true]:duration-75 flex justify-start overflow-x-hidden duration-200 px-2 py-1 h-fit data-[mobile=true]:rounded-md rounded-none'>
                          <Avatar data-mobile={sidebarOpen} className='items-center data-[mobile=false]:hover:shadow-md hover:bg-[#e7e7e7] border-none data-[mobile=true]:mr-4 mr-1 transition-all duration-300 h-8 w-8 inline-flex rounded-2xl justify-center'>
                        {/* <Image src={DefaultUser} className=" w-full " alt="@storeprobuilder"/> */}
                              <AvatarFallback className='bg-white border border-[#e8e8e8]'><Store/></AvatarFallback>
                          </Avatar>
                          <div className="flex-col justify-center items-start leading-tight flex">
                            <p className="text-[10px] mr-4">Staff007</p>
                            <p className="text-[10px] text-core_contrast/50">staffmail@xyz.store</p>
                        </div>
                </Button>
              </Link>

              {/* <div className={`inset-0 bg-black/60 flex justify-center items-center fixed ${customDialog?"z-[200]":"-z-10"}`}>
                <div className="grid gap-4 min-w-36">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label htmlFor="width">Width</label>
                      <InputBox
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
                </div> */}
            </div>
          
        </SidebarFooter>
      </div>
    </div>
  )
}

export default AppSidebar