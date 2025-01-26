'use client'
import { useContext,useEffect, useState } from "react"
import { headerValueContext } from "@/components/head-value";

const Sales = () => {
  const {headerContext,ResetHeadValue} = useContext(headerValueContext)
  useEffect(()=>{
      ResetHeadValue('Sales')
  })


  return (
    <div>
        Sales
    </div>
  )
  }
  
  export default Sales