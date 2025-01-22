import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const CollapseBox = ({children,disabled,subject,state,setState,bold,xxs,scale}) => {
     return (
          <div className="w-full">
               <div className='flex w-full items-center'>
                    <p data-state={state} data-xtrasmall={xxs} data-bold={bold} className="inline-block ml-1 data-[xtrasmall=true]:text-[11px] data-[bold=true]:font-semibold text-gray-500 data-[state=true]:text-black text-xs mr-3">{subject}</p>
                    <Switch data-scale={scale} disabled={disabled} className='data-[state=unchecked]:bg-core_contrast/40 shadow data-[scale=true]:scale-75' checked={state} onCheckedChange={setState} />
               </div>
               <div className={`grid transition-collapse ${state ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden w-full text-xs">
                         {children}
                    </div>
               </div>
          </div>
     )
}

export default CollapseBox