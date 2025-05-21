'use client'
import { useContext,useEffect, useState } from "react"
import { headerValueContext } from "@/components/context-values";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import SslesInvoiceData from "@/components/sales-invoice";

const Sales = () => {
  const {headerContext,ResetHeadValue} = useContext(headerValueContext)
  useEffect(()=>{
      ResetHeadValue('Sales')
  })


  return (
    <div className="h-full flex flex-col pt-1 pl-2 w-full">
{/*  
          <div className="flex b flex-grow">
            <TabsContent value="history" className='mt-0 h-full w-full p-1'>
              <div className="mx-auto bg-blue-300 h-full w-full">
                    
              </div>
            </TabsContent>
            <TabsContent value="invoice" className='mt-0 h-full w-full p-1'>
              <div className="mx-auto overflow-y-scroll rounded-md p-2 h-full w-full">
                <SslesInvoiceData />
              </div>
            </TabsContent>
            <TabsContent value="proforma" className='mt-0 h-full w-full p-1'>
              <div className="mx-auto bg-blue-500 h-full w-full">
                    
              </div>
            </TabsContent>
            <TabsContent value="returns" className='mt-0 h-full w-full p-1'>
              <div className="mx-auto bg-blue-600 h-full w-full">
                    
              </div>
            </TabsContent>
            <TabsContent value="delivery" className='mt-0 h-full w-full p-1'>
              <div className="mx-auto bg-blue-700 h-full w-full">
                    
              </div>
            </TabsContent>
          </div> */}
    </div>
  )
  }
  
  export default Sales