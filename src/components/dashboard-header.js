'use client'
import { useEffect, useState,useContext} from "react";
import Link from "next/link";
import { Bell,Mail, MessageSquare, } from "lucide-react";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {  Drawer,DrawerPortal,DrawerOverlay,DrawerTrigger,DrawerClose,DrawerContent,DrawerHeader,DrawerFooter,DrawerTitle,DrawerDescription, } from "@/components/ui/drawer";
import { Avatar,  AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import DefaultUser from '../../public/dummy.jpg'
import { headerValueContext } from "@/components/head-value";

const DashboardHeader = () => {
     const {headerContext,ResetHeadValue} = useContext(headerValueContext)
     // useEffect(()=>{
     //      ResetHeadValue('Dashboard')
     // },[])
     return (
          <header className=" rounded-md px-3 pt-2  text-xs flex w-full justify-between items-center">
               <div className="p-1 font-bold text-sm">{headerContext}</div>
               <div className="flex md:gap-1 gap-2 items-center">
                    <div className="">
                         <Mail className="p-[5px]" />
                    </div>
                    <div className="">
                         <Bell className="p-[5px]" />
                    </div>
                    <DropdownMenu className="text-right hidden md:block">
                         <DropdownMenuTrigger asChild>
                              <div className="md:flex scale-90 hidden gap-2 items-center">
                                   <Avatar className='items-center inline-flex rounded-full w-7 h-7 justify-center'>
                                        <Image src={DefaultUser} className=" w-full " alt="@storeprobuilder"/>
                                        {/* <AvatarFallback>JO</AvatarFallback> */}
                                   </Avatar>
                                   <div className="flex-col justify-center leading-tight flex">
                                        <p className="text-[10px] ">Staff</p>
                                        <p className="text-[10px] text-core_contrast/50">staffmail@role.com</p>
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
     )
}

export default DashboardHeader