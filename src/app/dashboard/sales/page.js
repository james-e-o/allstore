'use client'
import { useContext,useEffect, useState } from "react"
import { headerValueContext } from "@/components/context-values";
import DashboardHeader from "@/components/dashboard-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import SslesInvoiceData from "@/components/sales-invoice";

const Sales = () => {
  const {headerContext,ResetHeadValue} = useContext(headerValueContext)
  useEffect(()=>{
      ResetHeadValue('Sales')
  })


  return (
    <div className="h-full flex flex-col pt-1 pl-2 w-full">
        <DashboardHeader section={'Sales'} size={'sm'}/>   
        <Tabs className="h-full flex-grow flex flex-col" defaultValue="history">
          <TabsList className='mt-2 mx-1 bg-purple-50/70 border border-white/60 gap-4 w-fit'>
            <TabsTrigger value='history'>All Sales</TabsTrigger>
            <TabsTrigger value='invoice'>Sales Invoice</TabsTrigger>
            <TabsTrigger value='proforma'>Proforma Invoice</TabsTrigger>
            <TabsTrigger value='returns'>Sales Returns</TabsTrigger>
            <TabsTrigger value='delivery'>Delivery Note</TabsTrigger>
          </TabsList>
          <div className="flex b flex-grow">
            <TabsContent value="history" className='mt-0 h-full w-full p-1'>
              <div className="mx-auto bg-blue-300 h-full w-full">
                    
              </div>
            </TabsContent>
            <TabsContent value="invoice" className='mt-0 h-full w-full p-1'>
              {/* <div className="mx-auto overflow-y-scroll rounded-md p-2 h-full w-full"> */}
                <SslesInvoiceData />
              {/* </div> */}
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
          </div>
        </Tabs>
    </div>
  )
  }
  
  export default Sales