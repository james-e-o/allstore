'use client'
import { useState,useEffect } from 'react'
import { X } from 'lucide-react'
import { AlertDialogContent } from '@/components/ui/alert-dialog'
import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Button } from "@/components/ui/button"
import React from 'react'

const Store = () => {
      const [customDialog,setCustomDialog] =useState(true)
  return (
    <div className="h-full overflow-clip">
      <div className={`inset-0 bg-blue-700/50 flex justify-center items-center fixed ${customDialog?"z-[200]":"-z-10"}`}>
        <div className='w-[97%] px-5 rounded-md bg-white m-5 h-[95%]'>
          <header className='font-semibold pt-4'>
            <p className='text-sm inline-block'>Store info</p>
            <Button variant='ghost' className="float-right "><X className='w-4 h-4'/></Button>
          </header>
        </div>
      </div>
    </div>
  )
}

export default Store