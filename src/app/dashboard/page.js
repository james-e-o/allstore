'use client'
import { Separator } from "@/components/ui/separator"
import {SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"


const Dashboard = () => {

  const [activeMenu, setActiveMenu] = useState('dashboard')

  return (
    <div className='w-full flex flex-col flex-grow '>
      <header className="p-2">
        <SidebarTrigger/>
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
  )
}

export default Dashboard