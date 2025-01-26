'use client'
import { useEffect, useState,useContext} from "react";
import { Separator } from "@/components/ui/separator"
import {SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { headerValueContext } from "@/components/head-value";


const Dashboard = () => {
  const {headerContext,ResetHeadValue} = useContext(headerValueContext)
  useEffect(()=>{
      ResetHeadValue('Dashboard')
  })
  return (
    <div className="h-full flex flex-col w-full">
      {/* <div className='w-full flex flex-col flex-grow '>
        <header className="p-4 font-Voces ">
            <p className="font-bold">DASHBOARD</p>
        </header>
        
        <div className="flex-grow p-2 overflow-y-scroll">
        
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard