'use client'
import { useEffect, useState,useContext} from "react";
import { Separator } from "@/components/ui/separator"
import {SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { headerValueContext } from "@/components/context-values";
import { Avatar,  AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDownRight, ArrowUpRight, BadgeDollarSign, Ellipsis, Receipt, ReceiptEuroIcon, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import { Bell,Mail, MessageSquare, } from "lucide-react";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {  Drawer,DrawerPortal,DrawerOverlay,DrawerTrigger,DrawerClose,DrawerContent,DrawerHeader,DrawerFooter,DrawerTitle,DrawerDescription, } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import Image from "next/image"
import { Input } from "@/components/ui/input";
import InputBox from "@/components/input-box";


const Dashboard = () => {
  const {headerContext,ResetHeadValue} = useContext(headerValueContext)
  useEffect(()=>{
      ResetHeadValue('Dashboard')
  })
  return (
    <div className="h-full pt-1 pl-2 w-full">
      {/* <DashboardHeader />    */}
      <div className="grid grid-cols-[repeat(5,minmax(1rem,1fr))_max-content] grid-rows-[max-content_min-content_repeat(2,minmax(1rem,1fr))_max-content] gap-3">
        <div className="col-start-1 col-span-2 justify-items-stretch gap-2 items-center inline-flex">
          <div className="p-1 inline-block font-bold text-sm">{'Dashboard'}</div>
        </div>
        <div className="col-start-3 col-span-3 justify-items-stretch gap-2 items-end inline-flex">
          <InputBox icon={<Search className="p-3px"/>} />
        </div>
        <div className="md:col-start-6 sm:col-start-5 md:col-span-3 flex justify-end sm:col-span-1">
          <DashboardHeader />
        </div>
        <div className="col-start-1 col-span-5 mt-3 row-start-2 justify-items-stretch gap-2 justify-center inline-flex flex-col">
          <div className="text-xs">
            <span className="font-light">Welcome to<span className="font-semibold">  Store 1</span> @<span className="font-semibold">XYZ</span> stores.</span>
          </div>
          <div className="text-3xl">
            <span className="font-light">Hello,</span>
            <span className="font-semibold"> Staff007</span>
          </div>
          <div className="text-xs">
            {/* <span className="font-light">Your daily dashboard</span> */}
            {/* <span className="font-semibold"> @XYZ Stores </span */}
          </div>
        </div>
        {/* <div className="md:col-start-6 sm:col-start-5 md:col-span-3 row-start-2 row-span-3 p-0 items-center justify-start flex flex-col rounded-md">
          <CalendarDemo />
        </div> */}
        <div className="justify-items-stretch mt-3 col-start-1 col-span-8 row-start-3 row-span-3 gap-2  items-start lg:grid-cols-3 md:grid-cols-1 inline-grid">
          {/* <div className="min-h-3 lg:col-start-1 w-full gap-2 h-full rounded-md flex"> */}
            <LongCardbox />
            <LongCardbox red/>
            <LongCardbox red/>
          {/* </div> */}
          {/* <div className="min-h-3 lg:col-start-2 w-full gap-2 rounded-md grid grid-rows-2 grid-cols-2">
            <Cardbox />
            <Cardbox red/>
            <Cardbox />
            <Cardbox />
          </div> */}
        </div>
        {/* <div className="justify-items-stretch col-start-3 col-span-3 row-start-3 row-span-1 gap-2 items-center inline-flex shadow bg-white rounded-md">
          <Avatar className='items-center inline-flex rounded-full w-12 h-12 justify-center'>
              <AvatarFallback><BadgeDollarSign className="h-9 w-9"/></AvatarFallback>
          </Avatar>
        </div>
        */}
      </div>
      <div className="flex gap-2">

      </div>
    </div>
  )
}

export default Dashboard



 
export function CalendarDemo() {
  const [date, setDate] = useState(new Date())
 
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md m-0 bg-white w-fit border shadow"
    />
  )
}



export const Cardbox = ({red}) => {
  return (
    <div className="py-4 px-2 bg-white shadow rounded-md flex flex-grow flex-col gap-2 justify-between">
      <p className="text-9px text-core_contrast/60 text-ellipsis
      ">
        <span className="mr-5">Total Revenue</span>
        <span className="float-right text-black pt-2px"><Ellipsis className="w-2 h-2"/></span></p>
      <div className="flex items-center w-full gap-1">
        <Button className='rounded-full overflow-clip h-5 w-4 p-3'><Receipt className="rounded-full"/></Button>
        <p className="text-[15px] font-semibold">$500,000</p>
      </div>
      <p className="text-9px font-semibold flex flex-col">
        <span data-red={red} className="text-green-500 data-[red]:text-red-500 items-center text-10px inline-flex">{red?<ArrowDownRight className="w-3 h-3"/>:<ArrowUpRight className="w-3 h-3"/>}{`3.2`}%</span>
        <span>From last week</span>
      </p>
    </div>
  )
}


export const LongCardbox = ({red}) => {
  return (
    <div className="p-5 bg-white shadow rounded-md flex flex-grow h-full flex-col gap-2 justify-between">
      <p className="text-9px text-core_contrast/60 text-ellipsis">
        <span data-red={red} className="mr-5 relative -top-2">Sales overview</span>
      </p>
      <div className="flex flex-col gap-10">
        <CardItem />
        {/* <CardItem /> */}
        <CardItem />
      </div>
      <p className="text-9px font-semibold flex flex-col">
        <span data-red={red} className="text-green-500 data-[red]:text-red-500 items-center text-10px inline-flex"><ArrowUpRight className="w-3 h-3"/>{`3.2`}%</span>
        <span>From last week</span>
      </p>
    </div>
  )
}

export const CardItem = () => {
  return (
    <div className="flex items-center w-full gap-1">
      <div className="flex leading-tight flex-col">
        <p className="text-9px ml-1 text-core_contrast font-semibold">Sales Revenue</p>
        <p className="text-[15px] font-semibold">$500,000</p>
      </div>
    </div>
  )
}
