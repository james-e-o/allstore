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
import { headerValueContext } from "@/components/context-values";

const DashboardHeader = ({section,size}) => {
 
     return (
          <header className=" rounded-md pl-0 pr-1 md:pr-0 text-xs flex w-full justify-between items-center">
               {section?<div data-size={size} className="py-1 px-2 font-bold data-[size=xs]:text-xs data-[size=sm]:text-sm">{section&&section}</div>:""}
               <div className="flex md:gap-3 py-2 px-3 min-w-max rounded-md shadow bg-white gap-2 items-center">
                    <DropdownMenu className="text-right hidden md:block">
                         <DropdownMenuTrigger asChild>
                              <div className="md:flex scale-90 hidden gap-2 items-center">
                                   <Avatar className='items-center inline-flex rounded-full w-7 h-7 justify-center'>
                                        <Image src={DefaultUser} className=" w-full " alt="@storeprobuilder"/>
                                        {/* <AvatarFallback>JO</AvatarFallback> */}
                                   </Avatar>
                                   <div className="flex-col justify-center leading-tight flex">
                                        <p className="text-[10px] ">Staff007</p>
                                        <p className="text-[10px] text-core_contrast/50">staffmail@xyz.store</p>
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
                    <div className="md:hidden">
                         <Mail className="p-[5px]" />
                    </div>
                    <div className="">
                         <Bell className="p-[5px]" />
                    </div>
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