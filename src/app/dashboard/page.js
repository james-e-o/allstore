'use client'
import { Separator } from "@/components/ui/separator"
import {SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"


const Dashboard = () => {

  const [activeMenu, setActiveMenu] = useState('dashboard')

  return (
    <div className="h-full flex flex-col bg-gray-50 w-full">
      <div className='w-full flex flex-col flex-grow '>
        <header className="p-4 font-Voces ">
            <p className="font-bold">DASHBOARD</p>
            {/* <p className="mt-[1px] text-gray-300 text-xs">{path}</p> */}
        </header>
        
        <div className="flex-grow p-2 overflow-y-scroll">
          {
              activeMenu === 'publication'?
              <NewPublication/>
              :
              ""
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard