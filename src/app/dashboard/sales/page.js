'use client'
import { useContext,useEffect, useState } from "react"
import { headerValueContext } from "@/components/context-values";
import DashboardHeader from "@/components/dashboard-header";

const Sales = () => {
  const {headerContext,ResetHeadValue} = useContext(headerValueContext)
  useEffect(()=>{
      ResetHeadValue('Sales')
  })


  return (
    <div>
       <DashboardHeader />   
        Sales
    </div>
  )
  }
  
  export default Sales