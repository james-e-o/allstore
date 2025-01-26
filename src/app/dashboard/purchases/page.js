'use client'
import { useContext,useEffect, useState } from "react"
import { headerValueContext } from "@/components/head-value";

const Purchases = () => {

   const {headerContext,ResetHeadValue} = useContext(headerValueContext)
    useEffect(()=>{
        ResetHeadValue('Purchases')
    })

  return (
      <div>
          Purchases
      </div>
  )
}
  
  export default Purchases