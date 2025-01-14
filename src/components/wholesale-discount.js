'use client'
import { useState,useEffect } from "react"
import InputBox from "./input-box"

const WholesaleDiscount =({sellingPrice,setOutput,output})=> {
     const [value,setValue]=useState(0)
     const [bulkDiscountIsPercent,setBulkDiscountIsPercent]=useState(true)
   
     function computeDiscount(){
       if(bulkDiscountIsPercent){
         let disount = (value/100) * sellingPrice
         setOutput(disount)
         return
       }
       setOutput(value)
     }
   
     useEffect(()=>{
       computeDiscount()
     },[value,bulkDiscountIsPercent])
   
     return (
       <div className="flex flex-col">
         <div className="mt-2 flex w-fit justify-start h-fit items-center">
           <div className=""><InputBox width={'120px'} flexdir={'row'} value={value?value:""} change={(e)=>{setValue(new Number(e.target.value))}} /></div>
           <div className="inline-flex ml-1 gap-[1px]">
             <button data-state={bulkDiscountIsPercent} size='xs' className='text-sm data-[state=false]:bg-black data-[state=false]:text-white rounded border border-black/40 px-3 py-1' onClick={()=>{setBulkDiscountIsPercent(false)}}>{`$`}</button>
             <button data-state={bulkDiscountIsPercent} size='xs' className='text-sm data-[state=true]:bg-black data-[state=true]:text-white rounded border border-black/40 px-3 py-1' onClick={()=>{setBulkDiscountIsPercent(true)}}>{`%`}</button>
           </div>
         </div>
         <div className="py-1">
           {sellingPrice? <p className="ml-4 text-sm mt-1">{`$${output} discount`}</p>:""}
         </div>
       </div>
     )
   }

   export default WholesaleDiscount